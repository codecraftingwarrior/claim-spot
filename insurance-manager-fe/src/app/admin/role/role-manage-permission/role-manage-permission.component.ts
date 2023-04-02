import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntityGroup } from '../entity-group';
import { EntityPermission } from '../entity-permission';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-manage-permission',
  templateUrl: './role-manage-permission.component.html',
  styleUrls: ['./role-manage-permission.component.scss']
})
export class RoleManagePermissionComponent implements OnInit, OnDestroy {

  @Input() role: Role;
  @Output() finished: EventEmitter<any> = new EventEmitter();
  entityGroups: EntityGroup[] = [];
  constructor(
    public roleSrv: RoleService,
    public spinner: NgxSpinnerService,
    public authSrv: AuthService,
  ) { }

  ngOnInit(): void {
    this.findEntityGroups();
  }

  ngOnDestroy() {
    this.entityGroups = [];
  }

  handleEntityGroupSelection(event: any, entityGroup: EntityGroup) {
    entityGroup.entityPermissions.forEach(entityPermission => {
      entityPermission.isDeletePermitted = event.target.checked;
      entityPermission.isWritePermitted = event.target.checked;
      entityPermission.isViewAllPermitted = event.target.checked;
      entityPermission.isViewOnePermitted = event.target.checked;
      entityPermission.allPermitted = event.target.checked;
    });
  }


  handleEntityPermissionSelection(event: any, entityPermission: EntityPermission) {
    entityPermission.isDeletePermitted = event.target.checked;
    entityPermission.isWritePermitted = event.target.checked;
    entityPermission.isViewAllPermitted = event.target.checked;
    entityPermission.isViewOnePermitted = event.target.checked;
  }

  onItemStateChanges(event: any, entityPermission: EntityPermission) {
    if (entityPermission.isViewAllPermitted && entityPermission.isDeletePermitted && entityPermission.isViewOnePermitted
      && entityPermission.isWritePermitted
    ) {
      entityPermission.allPermitted = true;
    } else {
      entityPermission.allPermitted = false;
    }
  }

  findEntityGroups() {
    this.spinner.show();
    this
      .roleSrv
      .getEntityGroups()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((entityGroups: EntityGroup[]) => {
        this.entityGroups = entityGroups;
        this.setGrantedPermissions();
      }, error => {
        this.roleSrv.httpSrv.handleError(error);
      })
  }

  setGrantedPermissions() {
    this.spinner.show();
    this.entityGroups.forEach(entityGroup => {
      entityGroup.entityPermissions.forEach(entityPermission => {
        const viewAllPermission = `${entityPermission.entityCode}:list`;
        const viewOnePermission = `${entityPermission.entityCode}:view`;
        const writePermission = `${entityPermission.entityCode}:write`;
        const deletePermission = `${entityPermission.entityCode}:delete`;
        const grantedPermissions = this.role.permissions.map(p => p.nom);

        if (grantedPermissions.includes(viewAllPermission)) {
          entityPermission.isViewAllPermitted = true;
        } 

        if (grantedPermissions.includes(viewOnePermission)) {
          entityPermission.isViewOnePermitted = true;
        } 

        if (grantedPermissions.includes(writePermission)) {
          entityPermission.isWritePermitted = true;
        } 

        if (grantedPermissions.includes(deletePermission)) {
          entityPermission.isDeletePermitted = true;
        }
        
        if (entityPermission.isViewAllPermitted && entityPermission.isViewOnePermitted && entityPermission.isWritePermitted && entityPermission.isDeletePermitted) {
          entityPermission.allPermitted = true;
        }
      });
    });
    this.spinner.hide();
  }

  commitChanges() {
    this.entityGroups.forEach(eg => {
      eg.entityPermissions.forEach(ep => delete ep.allPermitted);
    })
    this.spinner.show();
    this
      .roleSrv
      .managePermissions(this.role, this.entityGroups)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((role: Role) => {
        this.finished.emit();
        this.authSrv.getCurrentUser();
        this.roleSrv.httpSrv.notificationService.displaySuccess('Changements enregistrés avec succès');
        this.role = role;
      }, err => {
        this.roleSrv.httpSrv.handleError(err);
      });

  }

}

import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Role } from '../role';
import { roleColumns } from '../role.columns';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  columns = roleColumns;
  roles: Role[] = [];
  temp = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isPermissionModalVisible = false;
  isViewModalVisible = false;
  selectedRole: Role;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;

  constructor(
    public roleSrv: RoleService,
    public activatedRoute: ActivatedRoute,
    public location: Location,
    private spinner: NgxSpinnerService,
    public authSrv: AuthService, private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.roles = this.activatedRoute.snapshot.data.roles;
    if (this.roles.length) {
      this.temp = [...this.roles];
    }

  }

  displayNewModal() {
    this.isNewModalVisible = true;
  }

  displayEditModal(role: Role) {
    this.selectedRole = role;
    this.isEditModalVisible = true;
  }

  displayViewModal(role: Role) {
    this.selectedRole = role;
    this.isViewModalVisible = true;
  }

  displayManagePermissionModal(role: Role) {
    this.selectedRole = role;
    this.isPermissionModalVisible = true;
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      if (d.code.toLowerCase().indexOf(val) !== -1) {
        return true;
      } else if (d.nom.toLowerCase().indexOf(val) !== -1) {
        return true;
      }

      return false;
    });

    this.roles = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }

  onCreated(role: Role) {
    this.roles.push(role);
    this.roles = [...this.roles];
  }

  onUpdated(role: Role) {
    this.isEditModalVisible = false;
    this.spinner.hide();
    this.refresh();
  }

  onManagePermissionFinished() {
    this.isPermissionModalVisible = false;
    this.refresh();
  }

  delete(role: Role) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .roleSrv
            .destroy(role)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.roles = this.roles.filter(r => r.id !== role.id);
            this.roles = [...this.roles];
            this.roleSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.');
          })
          .catch((err) => {
            this.roleSrv.httpSrv.handleError(err);
          })
    });
  
}

refresh() {
  this.spinner.show();
  this
    .roleSrv
    .findAll()
    .pipe(
      first(),
      finalize(() => this.spinner.hide())
    ).subscribe((roles: Role[]) => {
      this.roles = roles;
      this.roles = [...this.roles];
    }, err => {
      this.roleSrv.httpSrv.handleError(err);
    })
}

 

}

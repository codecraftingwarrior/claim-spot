import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { EntityGroup } from '../entity-group';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  @Input() role: Role;
  roleView: { role: Role, entityGroups: EntityGroup[] };
  constructor(
    public roleSrv: RoleService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.findWithPermissions();
  }

  findWithPermissions() {
    this.spinner.show();
    this
      .roleSrv
      .findWithPermission(this.role)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((roleView: { role: Role, entityGroups: EntityGroup[] }) => {
        this.roleView = roleView;
      }, err => {
        this.roleSrv.httpSrv.handleError(err);
      })
  }

}

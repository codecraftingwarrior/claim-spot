import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-new',
  templateUrl: './role-new.component.html',
  styleUrls: ['./role-new.component.scss']
})
export class RoleNewComponent implements OnInit {

  @Output() created: EventEmitter<Role> = new EventEmitter();
  role: Role;
  constructor(
    public roleSrv: RoleService,
    private spinner: NgxSpinnerService
  ) {
    this.role = new Role();
  }

  ngOnInit(): void {
  }

  create() {
    this.spinner.show();
    this
      .roleSrv
      .store(this.role)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
        ).subscribe((role: Role) => {
        this.created.emit(role);
        this.roleSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
        this.role = new Role();
      }, error => {
        this.roleSrv.httpSrv.handleError(error);
      });
  }

}

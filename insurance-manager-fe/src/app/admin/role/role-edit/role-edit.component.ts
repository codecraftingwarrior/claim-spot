import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  @Input() role: Role;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  constructor(
    public roleSrv: RoleService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  update() {
    this.spinner.show();
    this
      .roleSrv
      .update(this.role)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((role: Role) => {
        this.updated.emit();
        this.roleSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.roleSrv.httpSrv.handleError(err);
      });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Formule } from '../../formule/formule.model';
import { FormuleService } from '../../formule/formule.service';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';
import { ApplicationUser } from '../application-user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() user: ApplicationUser;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  formules: Formule[] = [];
  selectedFormule: Formule = new Formule();
  constructor(
    public userSrv: UserService, private spinner: NgxSpinnerService, public roleSrv: RoleService,
    public formuleSrv: FormuleService
  ) { }

  ngOnInit(): void {
    this.selectedRoles = this.user.roles;
    this.selectedFormule = this.user.formule;
    this.fetchRoles();
    this.fetchFormules();
  }

  update() {
    this.spinner.show();
    this.user.authorities = [];
    this.user.grantedAuthorities = [];
    this.user.roles = this.selectedRoles.map(role => ({ id: role.id })) as any;
    this.user.formule = ({ id: this.selectedFormule.id }) as any;
    this
      .userSrv
      .update(this.user)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((user: ApplicationUser) => {
        this.updated.emit();
        this.userSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.roleSrv.httpSrv.handleError(err);
      });
  }

  fetchRoles() {
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
      });
  }

  fetchFormules() {
    this.spinner.show();
    this
      .formuleSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((formules: Formule[]) => {
        this.formules = formules;
        this.formules = [...this.formules];
      }, err => {
        this.roleSrv.httpSrv.handleError(err);
      });
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Formule } from '../../formule/formule.model';
import { FormuleService } from '../../formule/formule.service';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';
import { ApplicationUser } from '../application-user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  user: ApplicationUser;
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  formules: Formule[] = [];
  selectedFormule: Formule;
  passwordConfirm: string;
  plainPassword: string;
  @Output() created: EventEmitter<ApplicationUser> = new EventEmitter();
  constructor(
    public userSrv: UserService, private spinner: NgxSpinnerService, public roleSrv: RoleService,
    public formuleSrv: FormuleService
  ) {
    this.selectedFormule = new Formule();
    this.user = new ApplicationUser();
    this.user.genre = "Homme";
  }

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchFormules();
  }

  create() {
    this.spinner.show();
    if (this.plainPassword !== this.passwordConfirm) {
      this.userSrv.httpSrv.notificationService.displayError('Les mots de passe ne concordent pas.');
      this.spinner.hide();
      return;
    }

    if (this.plainPassword.length < 6) {
      this.userSrv.httpSrv.notificationService.displayError('Le mot de passe doit faire au moins 6 caractéres');
      this.spinner.hide();
      return;
    }
    this.user.authorities = [];
    this.user.grantedAuthorities = [];
    this.user.password = this.plainPassword;
    this.user.roles = this.selectedRoles.map(role => ({ id: role.id })) as any;
    if(this.selectedFormule) {
      this.user.formule = ({ id: this.selectedFormule.id }) as any;
      delete this.user.formule;
    }
    this
      .userSrv
      .store(this.user)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((user: ApplicationUser) => {
        this.created.emit(user);
        this.userSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.user = new ApplicationUser();
        this.selectedRoles = [];
        this.selectedFormule = null;
        this.passwordConfirm = '';
        this.plainPassword = '';
      }, err => {
        this.userSrv.httpSrv.handleError(err);
      })
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

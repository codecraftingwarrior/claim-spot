import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { UserService } from 'src/app/admin/user/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.scss']
})
export class MonCompteComponent implements OnInit {

  @Input() currentUser: ApplicationUser;
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
  passwordType: { currentPassword: string, newPassword: string, confirmPassword: string }
    = { currentPassword: 'password', newPassword: 'password', confirmPassword: 'password' };
  confirmModal: NzModalRef;
  constructor(
    public userSrv: UserService,
    public authSrv: AuthService,
    private spinner: NgxSpinnerService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.currentUser = { ...this.currentUser };
  }

  updateInfos() {
    this.spinner.show();
    this.currentUser.authorities = [];
    this.currentUser.grantedAuthorities = [];
    this.currentUser.roles = this.currentUser.roles.map(role => ({ id: role.id })) as any;
    this.currentUser.formule = ({ id: this.currentUser.formule.id }) as any;
    this
      .userSrv
      .update(this.currentUser)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((user: ApplicationUser) => {
        this.userSrv.httpSrv.notificationService.displaySuccess('Vos informations ont bien été mises à jour.');
        this.currentUser = user;
        this.authSrv.getCurrentUser();
      }, err => {
        this.userSrv.httpSrv.handleError(err);
      });
  }

  updatePassword() {
    if (this.newPassword.length < 6) {
      this.userSrv.httpSrv.notificationService.displayError('Le mot de passe  doit contenir au moins 6 caractéres.');
      return
    }

    if (this.newPassword !== this.passwordConfirm) {
      this.userSrv.httpSrv.notificationService.displayError('Les mot de passes saisies ne concordent pas.');
      return;
    }

    this.currentUser.authorities = [];
    this.currentUser.grantedAuthorities = [];
    this.currentUser.roles = this.currentUser.roles.map(role => ({ id: role.id })) as any;
    this.currentUser.formule = ({ id: this.currentUser.formule.id }) as any;
    this.currentUser.plainPassword = this.currentPassword;
    this.currentUser.newPassword = this.newPassword;
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous vraiment changer de mot de passe ?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          return this
            .userSrv
            .updatePassword(this.currentUser)
            .pipe(first())
            .subscribe((data: any) => {
              resolve(data);
            }, error => {
              reject(error);
            });
        }).then((data: any) => {
          this.userSrv.httpSrv.notificationService.displaySuccess('Votre mot de passe a été modifié.');
          this.newPassword = '';
          this.currentPassword = '';
          this.passwordConfirm = '';
        }).catch((error) => this.userSrv.httpSrv.handleError(error))
    });

  }

}

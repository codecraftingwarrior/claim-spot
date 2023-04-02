import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: { username: string, password: string } = { username: '', password: '' };
  constructor(
    public authSrv: AuthService, public tokenManager: TokenManagerService, public router: Router
  ) { }

  ngOnInit(): void {
    // For Demo Purpose [Changing input group text on focus]
    $(function () {
      $('input, select').on('focus', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
      });
      $('input, select').on('blur', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
      });
    });

  }

  signIn() {
    if (!this.credentials.username || !this.credentials.password) {
      this.authSrv.httpSrv.notificationService.displayError('Veuillez remplir tous les champs');
      return;
    }

    this
      .authSrv
      .login(this.credentials)
      .subscribe((data: { token: string }) => {
        this.tokenManager.setToken(data.token);
        this
          .authSrv
          .getCurrentUser()
          .then(currentUser => {
            if (this.authSrv.hasAnyRole(['ROLE_RESP', 'ROLE_EXP', 'ROLE_AS', 'ROLE_SA'])) {
              this.router.navigate(['/core', 'espace-personnel']);
            } else {
              this.router.navigate(['']);
            }
          })
          .catch(err => {
            this.authSrv.httpSrv.handleError(err);
          });

      }, err => {
        this.authSrv.httpSrv.handleError(err);
      })

  }

}

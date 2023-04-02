import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  location: any;
  routerSubscription: any;
  constructor(
    private router: Router, private authSrv: AuthService
  ) {

  }

  ngOnInit() {
    window.addEventListener('offline', event => {
      this.authSrv.httpSrv.notificationService.displayWarning('Vous êtes déconnecté.');
    });
    window.addEventListener('online', event => {
      this.authSrv.httpSrv.notificationService.displaySuccess('Votre connexion a été restaurée.');
    })
    //this.recallJsFuntions();
  }

  recallJsFuntions() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          $('#preloader').fadeIn('slow');
        }
      });
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        $.getScript('../assets/js/main.js');
        $('#preloader').fadeOut('slow');
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }
}

import { HttpService } from './http.service';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { TokenManagerService } from './token-manager.service';
import { HttpHeaders } from '@angular/common/http';
import { ApplicationUser } from 'src/app/admin/user/application-user';
//import { User } from 'src/app/pages/user/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserManager: BehaviorSubject<any> = new BehaviorSubject([]);
  public currentUserProvider = this.currentUserManager.asObservable();
  currentUser: any;

  public localStorage = window.localStorage;

  constructor(public httpSrv: HttpService<any>, @Inject('LOGIN_URL') private loginUrl: string) { }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.httpSrv.get('user/current/')
        .subscribe((data: any) => {
          this.currentUser = data;
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserManager.next(data);
          resolve(this.currentUser);
        }, error => {
          if (error.error.code === 401) {
            this.httpSrv._router.navigate(['/auth', 'login']);
          }
          console.log(error);
          resolve(false);
        });
    });
  }


  login(credentials: { username: string, password: string }): Observable<{ token: string }> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    const httpOptions = {
      headers: headers
    }
    return this.httpSrv.http.post<{ token: string }>(this.loginUrl, { "username": credentials.username, "password": credentials.password }, httpOptions);
  }

  logout() {
    this.httpSrv.tokenManager.removeToken();
    localStorage.removeItem('currentUser');
    this.httpSrv._router.navigate(['/auth', 'login']);
  }

  getRoles(): string[] {
    let roles: string[] = [];
    if (this.currentUser && this.currentUser.groups) {
      this.currentUser.groups.forEach(group => {
        roles = roles.concat(group.roles);
      });
    } else {
      this.currentUserProvider
        .subscribe(data => {
          this.currentUser = data;
          if (this.currentUser && this.currentUser.groups) {
            this.currentUser.groups.forEach(group => {
              roles = roles.concat(group.roles);
            });
          }

        });
    }
    return roles;
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null || localStorage.getItem('token') !== null;
  }

  hasRole(role: string) {
    if (this.isLoggedIn()) {
      const grantedAuthorities: { authority: string }[] = JSON.parse(localStorage.getItem('currentUser')).grantedAuthorities;
      return grantedAuthorities.map(authority => authority.authority).includes(role);
    }
    return false;
  }

  hasAnyAuthority(authorities: string[]) {
    if (this.isLoggedIn()) {
      const grantedAuthorities: string[] = JSON.parse(localStorage.getItem('currentUser')).grantedAuthorities.map((ga: any) => ga.authority);
      return grantedAuthorities.some(grantedAuthority => authorities.includes(grantedAuthority));
    }
    return false;
  }

  hasAnyRole(roles: string[]) {
    if (this.isLoggedIn()) {
      const grantedAuthorities: string[] = JSON.parse(localStorage.getItem('currentUser')).grantedAuthorities.map((ga: any) => ga.authority);
      return grantedAuthorities.some(grantedAuthority => roles.includes(grantedAuthority));
    }
    return false;
  }

  hasAuthority(authority: string) {
    if (this.isLoggedIn()) {
      const grantedAuthorities: string[] = JSON.parse(localStorage.getItem('currentUser')).grantedAuthorities.map((ga: any) => ga.authority);
      return grantedAuthorities.includes(authority);
    }
    return false;
  }

  hasAnyResourceAuthority(resourceName: string) {
    return this.hasAnyAuthority([resourceName + ':list', resourceName + ':write', resourceName + ':delete', resourceName + ':view'])
  }

  hasWriteAuthority(resourceName: string) {
    return this.hasAuthority(`${resourceName}:write`);
  }

  hasViewAuthority(resourceName: string) {
    return this.hasAuthority(`${resourceName}:view`);
  }

  hasListAuthority(resourceName: string) {
    return this.hasAuthority(`${resourceName}:list`);
  }

  hasDeleteAuthority(resourceName: string) {
    return this.hasAuthority(`${resourceName}:delete`);
  }

  fetchCurrentUser(): ApplicationUser {
    if (this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem('currentUser')) as ApplicationUser;
    }
    return null;
  }
}

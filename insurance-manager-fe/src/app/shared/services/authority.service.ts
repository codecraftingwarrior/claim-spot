import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor() { }

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
}

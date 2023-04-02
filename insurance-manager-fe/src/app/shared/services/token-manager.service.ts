import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  tokenValue: string;
  public localStorage = window.localStorage;

  constructor(
    @Inject('TOKEN_PREFIX') private tokenPrefix: string
  ) { }

  getToken() {
    if (!this.tokenValue) {
      this.tokenValue = this.localStorage.getItem(this.tokenPrefix);
    }
    return this.tokenValue ? this.tokenValue : null;
  }

  getTokenPrefix() {
    return this.tokenPrefix;
  }

  setToken(value: string) {
    this.tokenValue = value;
    this.localStorage.setItem(this.getTokenPrefix(), value);
  }

  removeToken() {
    this.tokenValue = '';
    this.localStorage.removeItem(this.getTokenPrefix());
  }
}

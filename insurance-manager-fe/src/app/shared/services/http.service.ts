import { Router } from '@angular/router';
import { TokenManagerService } from './token-manager.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { NotificationService } from './notification.service';
import { BaseModel } from '../general/base.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T extends BaseModel> {
  httpOptions: any = null;

  constructor(
    @Inject('API_URL') private apiUrl: string, public http: HttpClient, public tokenManager: TokenManagerService,
    public _router: Router, private injector: Injector,
  ) { }

  public get notificationService(): NotificationService {
    return this.injector.get(NotificationService);
  }

  getAuthorizationHeader(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Authorization: this.tokenManager.getTokenPrefix() + ' ' + this.tokenManager.getToken(),
      'Content-type': 'application/json'
    });
    this.httpOptions = {
      headers: headers
    }

    return this.httpOptions;
  }

  buildPath(endpoint: string): string {
    return this.apiUrl + endpoint;
  }

  get<T>(targetUrl: string, withoutHeaders: boolean = false ) {
    return withoutHeaders ? this.http.get<T>(this.buildPath(targetUrl)) : this.http.get<T>(this.buildPath(targetUrl), this.getAuthorizationHeader());
  }

  post<T>(targetUrl: string, data: any) {
    return this.http.post<T>(this.buildPath(targetUrl), data, this.getAuthorizationHeader());
  }

  put<T>(targetUrl: string, data: any) {
    return this.http.put<T>(this.buildPath(targetUrl), data, this.getAuthorizationHeader());
  }

  delete<T>(targetUrl: string) {
    return this.http.delete<T>(this.buildPath(targetUrl), this.getAuthorizationHeader());
  }

  handleError(error: any) {
    console.log(error);
    this.notificationService.displayError(error.error.message || error.message);
    if (error.status === 401 || error.error.code === 401) {
      this._router.navigate(['/auth', 'login']);
    }
  }
}

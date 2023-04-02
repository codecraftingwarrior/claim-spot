import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private path = 'common/'
  constructor(
    private httpSrv: HttpService<any>
  ) { }

  sendMail(mail: { to: string, object: string; content: string }): Observable<{ deleted: true }> {
    return this.httpSrv.post<{ deleted: true }>(this.path + 'send-mail', mail);
  }
}

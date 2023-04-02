import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Formule } from './formule.model';

@Injectable({
  providedIn: 'root'
})
export class FormuleService extends BaseService<Formule> {

  constructor(
    public httpSrv: HttpService<Formule>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'formule/';
    this.resourceName = 'formule';
  }

  findAll(): Observable<Formule[]> {
    return this.httpSrv.get<Formule[]>(this.path, true);
  }
}
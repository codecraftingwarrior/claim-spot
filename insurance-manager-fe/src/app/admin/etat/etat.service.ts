import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Etat } from './etat';

@Injectable({
  providedIn: 'root'
})
export class EtatService extends BaseService<Etat> {

  constructor(
    public httpSrv: HttpService<Etat>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'etat/';
    this.resourceName = 'etat';
   }
}
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { DetailAdversaire } from './detail-adversaire';

@Injectable({
  providedIn: 'root'
})
export class DetailAdversaireService extends BaseService<DetailAdversaire> {

  constructor(
    public httpSrv: HttpService<DetailAdversaire>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'detail-adversaire/';
    this.resourceName = 'detail-adversaire';
   }
}
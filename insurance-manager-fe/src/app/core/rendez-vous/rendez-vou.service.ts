import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { RendezVous } from './rendez-vou';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService extends BaseService<RendezVous> {

  constructor(
    public httpSrv: HttpService<RendezVous>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'rendez-vou/';
    this.resourceName = 'rendez-vous';
   }
}
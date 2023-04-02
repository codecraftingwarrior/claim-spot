import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Etat } from 'src/app/admin/etat/etat';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Accident } from './accident';

@Injectable({
  providedIn: 'root'
})
export class AccidentService extends BaseService<Accident> {

  constructor(
    public httpSrv: HttpService<Accident>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'accident/';
    this.resourceName = 'accident';
  }

  findAllLatestAwaitingValidation() {
    return this.httpSrv.get(this.path + 'latest/attente-validation');
  }

  findByEtat(etat: Etat) {
    return this.httpSrv.get<Accident[]>(this.path + 'by-etat/' + etat.id);  
  }

  validate(accident: Accident) {
    return this.httpSrv.get<Accident>(this.path + accident.id + '/validate');
  }

  switchToAwaitingExpertiseState(accident: Accident) {
    return this.httpSrv.get<Accident>(this.path + accident.id + '/switch-attente-expertise');
  }

  findAwaitingExpertise() {
    return this.httpSrv.get<Accident[]>(this.path + 'awaiting-exp/');
  }

  fenceAndNotify(accident: Accident) {
    return this.httpSrv.get<Accident>(this.path + accident.id + '/fence')
  }
}
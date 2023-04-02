import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Vehicule } from './vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService extends BaseService<Vehicule> {

  constructor(
    public httpSrv: HttpService<Vehicule>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'vehicule/';
    this.resourceName = 'vehicule';
  }
  
  update(vehicule: Vehicule): Observable<Vehicule> {
    return this.httpSrv.put<Vehicule>(this.path + vehicule.id + '?image=false', vehicule);
  }

  updateWithImage(vehicule: Vehicule): Observable<Vehicule> {
    return this.httpSrv.put<Vehicule>(this.path + vehicule.id + '?image=true', vehicule);
  }
}
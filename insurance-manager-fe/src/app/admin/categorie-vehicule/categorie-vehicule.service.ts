import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { CategorieVehicule } from './categorie-vehicule';

@Injectable({
  providedIn: 'root'
})
export class CategorieVehiculeService extends BaseService<CategorieVehicule> {

  constructor(
    public httpSrv: HttpService<CategorieVehicule>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'categorie-vehicule/';
    this.resourceName = 'categorie-vehicule';
   }
}
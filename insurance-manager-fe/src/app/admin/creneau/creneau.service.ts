import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Creneau } from './creneau';

@Injectable({
  providedIn: 'root'
})
export class CreneauService extends BaseService<Creneau> {

  constructor(
    public httpSrv: HttpService<Creneau>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'creneau/';
    this.resourceName = 'creneau';
   }

   findByDate(date: string) {
     return this.httpSrv.get<Creneau[]>(this.path + 'by-date/' + date);
   }

   storeMultiple(creneaux: Creneau[]) {
     return this.httpSrv.post<Creneau[]>(this.path + 'multiple', creneaux);
   }
}
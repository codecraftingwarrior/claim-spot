import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Annonce } from './annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService extends BaseService<Annonce> {

  constructor(
    public httpSrv: HttpService<Annonce>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'annonce/';
    this.resourceName = 'annonce';
   }

   findAll(): Observable<Annonce[]> {
    return this.httpSrv.get<Annonce[]>(this.path, true);
  }
}
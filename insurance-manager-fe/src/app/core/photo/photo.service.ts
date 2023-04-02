import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService<Photo> {

  constructor(
    public httpSrv: HttpService<Photo>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'photo/';
    this.resourceName = 'photo';
  }

  storeMultiple(photo: Photo[]): Observable<Photo[]> {
    return this.httpSrv.post<Photo[]>(this.path + 'store-multiple', photo);
  }
}
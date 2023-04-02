import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ApplicationUser } from './application-user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<ApplicationUser> {

  constructor(
    public httpSrv: HttpService<ApplicationUser>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'user/';
    this.resourceName = 'user';
   }

   updatePassword(user: ApplicationUser) {
     return this.httpSrv.put<ApplicationUser>(this.path + user.id + '/update-password', user);
   }

   changeImage(user: ApplicationUser) {
     return this.httpSrv.put<ApplicationUser>(this.path + user.id + '/change-image', user);
   }
}

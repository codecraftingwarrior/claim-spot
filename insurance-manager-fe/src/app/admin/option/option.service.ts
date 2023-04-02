import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Option } from './option';

@Injectable({
  providedIn: 'root'
})
export class OptionService extends BaseService<Option> {

  constructor(
    public httpSrv: HttpService<Option>,
    public toastr: ToastrService,
  ) {
    super(httpSrv, toastr);
    this.path = 'option/';
    this.resourceName = 'option';
   }
}
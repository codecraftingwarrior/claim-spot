import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _toastSrv: ToastrService
  ) { }

  displaySuccess(message: string) {
    this._toastSrv.success(message);
  }

  displayError(message: string) {
    this._toastSrv.error(message);
  }

  displayWarning(message: string) {
    this._toastSrv.warning( message);
  }

  displayInfo(message: string) {
    this._toastSrv.info(message);
  }
}

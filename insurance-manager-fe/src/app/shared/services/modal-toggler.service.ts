import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalTogglerService {

  constructor(
    private modalSrv: NgbModal
  ) { }

  toggleModal(modalContentRef: TemplateRef<any> | any) {

    return this.modalSrv.open(modalContentRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  public closeModal() {
    this.modalSrv.dismissAll('Cross click');
  }

  public hasOpenedModal() {
    return this.modalSrv.hasOpenModals();
  }
}

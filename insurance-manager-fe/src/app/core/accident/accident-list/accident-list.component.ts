import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AWAITING_EXPERTISE, AWAITING_PICS } from 'src/app/admin/etat/workflow';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Accident } from '../accident';
import { accidentColumns } from '../accident.columns';
import { AccidentService } from '../accident.service';

@Component({
  selector: 'app-accident-list',
  templateUrl: './accident-list.component.html',
  styleUrls: ['./accident-list.component.scss']
})
export class AccidentListComponent implements OnInit {

  temp = [];
  accidents: Accident[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedAccident: Accident;
  columns = accidentColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;
  isRvModalVisible = false;
  attentePhotoCode = AWAITING_PICS;
  attenteExpertiseCode = AWAITING_EXPERTISE;

  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public accidentSrv: AccidentService,
    public activatedRoute: ActivatedRoute,
    public modal: NzModalService,
    public nzImageSrv: NzImageService,
  ) { }

  ngOnInit(): void {
  }

  findAll() {
    this.spinner.show();
    this
      .accidentSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((accidents: Accident[]) => {
        this.accidents = accidents;
        if (this.accidents.length) {
          this.temp = [...this.accidents];
        }
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      
      const isFounded =
        d.code.toLowerCase().indexOf(val) !== -1 ||
        d.lieu.toLowerCase().indexOf(val) !== -1 ||
        d.vehicule.marque.toLowerCase().indexOf(val) !== -1 ||
        d.vehicule.modele.toLowerCase().indexOf(val) !== -1 ||
        false
      return isFounded;
    });

    this.accidents = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .accidentSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => { this.spinner.hide(); this.loadingIndicator = false })
      ).subscribe((accidents: Accident[]) => {
        this.accidents = accidents;
        this.accidents = [...this.accidents];
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(accident: Accident) {
    this.selectedAccident = accident;
    this.isViewModalVisible = true;
  }

  displayEditModal(accident: Accident) {
    this.selectedAccident = accident;
    this.isEditModalVisible = true;
  }

  onCreated(accident: Accident) {
    this.refresh();
  }

  onUpdated(accident: Accident) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(accident: Accident) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .accidentSrv
            .destroy(accident)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.accidents = this.accidents.filter(u => u.id !== accident.id);
            this.accidents = [...this.accidents];
            this.accidentSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.accidentSrv.httpSrv.handleError(err);
          })
    });
  }

  displayRendezVousDetailModal(accident: Accident) {
    this.selectedAccident = accident;
    this.isRvModalVisible = true;
  }

  displayPhotos(accident: Accident) {
    this
      .nzImageSrv
      .preview(accident.photos.map(photo => ({ src: photo.url, alt: 'Photo' })), { nzZoom: 0.9, nzRotate: 0, nzNoAnimation: false });

  }

}

import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Etat } from '../etat';
import { etatColumns } from '../etat.columns';
import { EtatService } from '../etat.service';

@Component({
  selector: 'app-etat-list',
  templateUrl: './etat-list.component.html',
  styleUrls: ['./etat-list.component.scss']
})
export class EtatListComponent implements OnInit {

  temp = [];
  etats: Etat[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedEtat: Etat;
  columns = etatColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public etatSrv: EtatService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.etats = this.activatedRoute.snapshot.data.etats;
    if (this.etats.length) {
      this.temp = [...this.etats];
    }
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded =
        d.code.toLowerCase().indexOf(val) !== -1 ||
        d.libelle.toLowerCase().indexOf(val) !== -1 ||
        false
      return isFounded;
    });

    this.etats = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .etatSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => { this.spinner.hide(); this.loadingIndicator = false })
      ).subscribe((etats: Etat[]) => {
        this.etats = etats;
        this.etats = [...this.etats];
      }, err => {
        this.etatSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(etat: Etat) {
    this.selectedEtat = etat;
    this.isViewModalVisible = true;
  }

  displayEditModal(etat: Etat) {
    this.selectedEtat = etat;
    this.isEditModalVisible = true;
  }

  onCreated(etat: Etat) {
    this.etats.push(etat);
    this.etats = [...this.etats];
  }

  onUpdated(etat: Etat) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(etat: Etat) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .etatSrv
            .destroy(etat)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.etats = this.etats.filter(u => u.id !== etat.id);
            this.etats = [...this.etats];
            this.etatSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.etatSrv.httpSrv.handleError(err);
          })
    });
  }

}

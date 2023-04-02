import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Annonce } from '../annonce';
import { annonceColumns } from '../annonce.columns';
import { AnnonceService } from '../annonce.service';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit {

  temp = [];
  annonces: Annonce[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedAnnonce: Annonce;
  columns = annonceColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public annonceSrv: AnnonceService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.annonces = this.activatedRoute.snapshot.data.annonces;
    if (this.annonces.length) {
      this.temp = [...this.annonces];
    }
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded =
                                                        d.libelle.toLowerCase().indexOf(val) !== -1 ||
                                                d.prix.toLowerCase().indexOf(val) !== -1 ||
                                                d.type.toLowerCase().indexOf(val) !== -1 ||
                                                d.validated.toLowerCase().indexOf(val) !== -1 ||
                                                d.disabled.toLowerCase().indexOf(val) !== -1 ||
                                false
      return isFounded;
    });

    this.annonces = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .annonceSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => {this.spinner.hide(); this.loadingIndicator = false})
      ).subscribe((annonces: Annonce[]) => {
        this.annonces = annonces;
        this.annonces = [...this.annonces];
      }, err => {
        this.annonceSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(annonce: Annonce) {
    this.selectedAnnonce = annonce;
    this.isViewModalVisible = true;
  }

  displayEditModal(annonce: Annonce) {
    this.selectedAnnonce = annonce;
    this.isEditModalVisible = true;
  }

  onCreated(annonce: Annonce) {
    this.annonces.push(annonce);
    this.annonces = [...this.annonces];
  }

  onUpdated(annonce: Annonce) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(annonce: Annonce) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .annonceSrv
            .destroy(annonce)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.annonces = this.annonces.filter(u => u.id !== annonce.id);
            this.annonces = [...this.annonces];
            this.annonceSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.annonceSrv.httpSrv.handleError(err);
          })
    });
  }

}

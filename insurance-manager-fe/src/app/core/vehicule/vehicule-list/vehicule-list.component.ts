import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Annonce } from '../../annonce/annonce';
import { AnnonceService } from '../../annonce/annonce.service';
import { Vehicule } from '../vehicule';
import { vehiculeColumns } from '../vehicule.columns';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit {

  temp = [];
  vehicules: Vehicule[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedVehicule: Vehicule;
  columns = vehiculeColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;
  isAnnonceNewModalVisible = false;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public vehiculeSrv: VehiculeService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    public annonceSrv: AnnonceService,
  ) { }

  ngOnInit(): void {
  }


  async findAll() {
    await this.authSrv.getCurrentUser();
    this.spinner.show();
    this
      .vehiculeSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((vehicules: Vehicule[]) => {
        this.vehicules = vehicules;
        if (this.vehicules.length) {
          this.temp = [...this.vehicules];
        }
      }, err => {
        this.vehiculeSrv.httpSrv.handleError(err);
      });
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded =
        d.immatriculation.toLowerCase().indexOf(val) !== -1 ||
        d.marque.toLowerCase().indexOf(val) !== -1 ||
        d.modele.toLowerCase().indexOf(val) !== -1 ||
        d.imgFilename.toLowerCase().indexOf(val) !== -1 ||
        d.imgUrl.toLowerCase().indexOf(val) !== -1 ||
        false
      return isFounded;
    });

    this.vehicules = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .vehiculeSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => { this.spinner.hide(); this.loadingIndicator = false })
      ).subscribe((vehicules: Vehicule[]) => {
        this.vehicules = vehicules;
        this.vehicules = [...this.vehicules];
      }, err => {
        this.vehiculeSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(vehicule: Vehicule) {
    this.selectedVehicule = vehicule;
    this.isViewModalVisible = true;
  }

  displayNewAnnonceModal(vehicule: Vehicule) {
    this.selectedVehicule = vehicule;
    this.isAnnonceNewModalVisible = true;
  }


  displayEditModal(vehicule: Vehicule) {
    this.selectedVehicule = vehicule;
    this.isEditModalVisible = true;
  }

  onCreated(vehicule: Vehicule) {
    this.vehicules.push(vehicule);
    this.vehicules = [...this.vehicules];
    this.isNewModalVisible = false;
  }

  onUpdated(vehicule: Vehicule) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(vehicule: Vehicule) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .vehiculeSrv
            .destroy(vehicule)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.vehicules = this.vehicules.filter(u => u.id !== vehicule.id);
            this.vehicules = [...this.vehicules];
            this.vehiculeSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.vehiculeSrv.httpSrv.handleError(err);
          })
    });
  }

  onAnnonceCreated(annonce: Annonce) {
    this.vehiculeSrv.httpSrv.notificationService.displaySuccess('Votre annonce a été publié avec succés');
    this.isAnnonceNewModalVisible = false;
  }

  deleteAnnonce(vehicule: Vehicule) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression de l\'annonce ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .annonceSrv
            .destroy(vehicule.annonce)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.selectedVehicule = new Vehicule();
            console.log(message);
            this.annonceSrv.httpSrv.notificationService.displaySuccess('L\'annonce a été supprimé avec succès.')
          })
          .catch((err) => {
            this.annonceSrv.httpSrv.handleError(err);
          })
    });
  }

}

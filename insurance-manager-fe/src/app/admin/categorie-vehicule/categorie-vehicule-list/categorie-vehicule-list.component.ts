import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategorieVehicule } from '../categorie-vehicule';
import { categorieVehiculeColumns } from '../categorie-vehicule.columns';
import { CategorieVehiculeService } from '../categorie-vehicule.service';

@Component({
  selector: 'app-categorie-vehicule-list',
  templateUrl: './categorie-vehicule-list.component.html',
  styleUrls: ['./categorie-vehicule-list.component.scss']
})
export class CategorieVehiculeListComponent implements OnInit {

  temp = [];
  categorieVehicules: CategorieVehicule[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedCategorieVehicule: CategorieVehicule;
  columns = categorieVehiculeColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public categorieVehiculeSrv: CategorieVehiculeService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.categorieVehicules = this.activatedRoute.snapshot.data.categorieVehicules;
    if (this.categorieVehicules.length) {
      this.temp = [...this.categorieVehicules];
    }
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded =
                                                        d.code.toLowerCase().indexOf(val) !== -1 ||
                                                d.libelle.toLowerCase().indexOf(val) !== -1 ||
                                                d.icon.toLowerCase().indexOf(val) !== -1 ||
                                false
      return isFounded;
    });

    this.categorieVehicules = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .categorieVehiculeSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => {this.spinner.hide(); this.loadingIndicator = false})
      ).subscribe((categorieVehicules: CategorieVehicule[]) => {
        this.categorieVehicules = categorieVehicules;
        this.categorieVehicules = [...this.categorieVehicules];
      }, err => {
        this.categorieVehiculeSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(categorieVehicule: CategorieVehicule) {
    this.selectedCategorieVehicule = categorieVehicule;
    this.isViewModalVisible = true;
  }

  displayEditModal(categorieVehicule: CategorieVehicule) {
    this.selectedCategorieVehicule = categorieVehicule;
    this.isEditModalVisible = true;
  }

  onCreated(categorieVehicule: CategorieVehicule) {
    this.categorieVehicules.push(categorieVehicule);
    this.categorieVehicules = [...this.categorieVehicules];
  }

  onUpdated(categorieVehicule: CategorieVehicule) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(categorieVehicule: CategorieVehicule) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .categorieVehiculeSrv
            .destroy(categorieVehicule)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.categorieVehicules = this.categorieVehicules.filter(u => u.id !== categorieVehicule.id);
            this.categorieVehicules = [...this.categorieVehicules];
            this.categorieVehiculeSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.categorieVehiculeSrv.httpSrv.handleError(err);
          })
    });
  }

}

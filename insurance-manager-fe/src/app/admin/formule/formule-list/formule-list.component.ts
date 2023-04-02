import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Formule } from '../formule.model';
import { formuleColumns } from '../formule.columns';
import { FormuleService } from '../formule.service';

@Component({
  selector: 'app-formule-list',
  templateUrl: './formule-list.component.html',
  styleUrls: ['./formule-list.component.scss']
})
export class FormuleListComponent implements OnInit {

  temp = [];
  formules: Formule[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedFormule: Formule;
  columns = formuleColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;
  activeLoadingIndicator = false;
  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public formuleSrv: FormuleService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.formules = this.activatedRoute.snapshot.data.formules;
    if (this.formules.length) {
      this.temp = [...this.formules];
    }
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded =
        d.code.toLowerCase().indexOf(val) !== -1 ||
        d.libelle.toLowerCase().indexOf(val) !== -1 ||
        d.description.toLowerCase().indexOf(val) !== -1 ||
        false
      return isFounded;
    });

    this.formules = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.loadingIndicator = true;
    this.spinner.show();
    this
      .formuleSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => { this.spinner.hide(); this.loadingIndicator = false; })
      ).subscribe((formules: Formule[]) => {
        this.formules = formules;
        this.formules = [...this.formules];
      }, err => {
        this.formuleSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(formule: Formule) {
    this.selectedFormule = formule;
    this.isViewModalVisible = true;
  }

  displayEditModal(formule: Formule) {
    this.selectedFormule = formule;
    this.isEditModalVisible = true;
  }

  onCreated(formule: Formule) {
    this.refresh();
  }

  onUpdated(formule: Formule) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(formule: Formule) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .formuleSrv
            .destroy(formule)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.formules = this.formules.filter(u => u.id !== formule.id);
            this.formules = [...this.formules];
            this.formuleSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.formuleSrv.httpSrv.handleError(err);
          })
    });
  }

  setVisible(formule: Formule) {
    if (!this.activeLoadingIndicator) {
      this.activeLoadingIndicator = true;
      formule.visible = !formule.visible;
      this
        .formuleSrv
        .update({
          ...formule,
          ...{ options: formule.options.map(opt => ({ id: opt.id }) as any) }
        }).pipe(
          first(),
          finalize(() => this.activeLoadingIndicator = false)
        ).subscribe((formule: Formule) => {
          const message = formule.visible ? 'Réussi. Cette formule sera maintenant visible par les visiteurs.' : 'Cette formule ne sera plus visible par les visiteurs.';
          this.formuleSrv.httpSrv.notificationService.displaySuccess(message);
        }, err => {
          this.formuleSrv.httpSrv.handleError(err);
        });

    }
  }

}

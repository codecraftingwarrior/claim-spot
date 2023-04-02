import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Creneau } from '../creneau';
import { creneauColumns } from '../creneau.columns';
import { CreneauService } from '../creneau.service';

@Component({
  selector: 'app-creneau-list',
  templateUrl: './creneau-list.component.html',
  styleUrls: ['./creneau-list.component.scss']
})
export class CreneauListComponent implements OnInit {

  selectedCreneau: Creneau;
  columns = creneauColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;
  mode: NzCalendarMode = 'month';
  selectedDate: Date = new Date();
  associatedCreneaux: Creneau[] = [];
  isCloneModalVisible: boolean = false;
  dateForClone = new Date();
  creneaux: Creneau[] = [];

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public creneauSrv: CreneauService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.creneaux = this.activatedRoute.snapshot.data.creneaux;
    this.findByDate(new Date());
  }

  findAll() {
    this
      .creneauSrv
      .findAll()
      .pipe(first())
      .subscribe((creneaux: Creneau[]) => {
        this.creneaux = creneaux;
      }, err => {
        this.creneauSrv.httpSrv.handleError(err);
      })
  }



  refresh() {
    this.findByDate(this.selectedDate || new Date());
  }

  createWithTime(time: any) {
    this.spinner.show();
    const creneau: Creneau = new Creneau();
    creneau.choosen = false;
    creneau.date = this.getDateAsString(this.selectedDate);
    creneau.heure = time;
    this
      .creneauSrv
      .store(creneau)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((creneau: Creneau) => {
        this.associatedCreneaux.push(creneau);
        this.creneauSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
        this.creneaux.push(creneau);
      }, err => {
        this.creneauSrv.httpSrv.handleError(err);
      });

  }

  showCloneModal(): void {
    if (!(this.associatedCreneaux.length > 0)) {
      alert("Il n'ya aucun creneau à cloner pour cette date");
      return;
    }
    this.isCloneModalVisible = true;
  }

  clone() {
    if (this.getDateAsString(this.dateForClone) < this.getDateAsString(new Date())) {
      alert('Verifier la date de clonage');
      return;
    }
    const clonedCreneaux: Creneau[] = [];
    this.associatedCreneaux.forEach(creneau => {
      clonedCreneaux.push({ choosen: false, date: this.getDateAsString(this.dateForClone), heure: creneau.heure, id: null });
    });

    this
      .creneauSrv
      .storeMultiple(clonedCreneaux)
      .subscribe((creneaux: Creneau[]) => {
        this.selectedDate = this.dateForClone;
        this.findByDate(this.selectedDate);
        this.isCloneModalVisible = false;
        this.creneauSrv.httpSrv.notificationService.displaySuccess('Clonage effectué avec succés.');
      }, err => {
        this.creneauSrv.httpSrv.handleError(err);
      })
  }
  onSelectedDateChange(selectedDate: Date) {
    this.findByDate(selectedDate);
  }

  findByDate(date: Date) {
    this
      .creneauSrv
      .findByDate(this.getDateAsString(date))
      .subscribe((creneaux: Creneau[]) => {
        this.associatedCreneaux = creneaux;
      }, err => {
        this.creneauSrv.httpSrv.handleError(err);
      })
  }

  getDateAsString(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  delete(creneau: Creneau) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .creneauSrv
            .destroy(creneau)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.associatedCreneaux = this.associatedCreneaux.filter(c => c.id !== creneau.id);
            this.associatedCreneaux = [...this.associatedCreneaux];
            this.creneaux = this.creneaux.filter(c => c.id !== creneau.id);
            this.creneauSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.creneauSrv.httpSrv.handleError(err);
          })
    });
  }

  hasAtLeastOneDisponibilite(date: any) {
    return this
      .creneaux
      .some(creneau => this.getDateAsString(creneau.date as any) === this.getDateAsString(date) && !creneau.choosen);
  }

}

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Creneau } from '../creneau';
import { CreneauService } from '../creneau.service';

@Component({
  selector: 'app-creneau-selection',
  templateUrl: './creneau-selection.component.html',
  styleUrls: ['./creneau-selection.component.scss']
})
export class CreneauSelectionComponent implements OnInit {

  creneaux: Creneau[] = [];
  selectedCreneau: Creneau;
  selectedDate: Date;
  previousSelectedDate: Date;
  date: Date;
  currentSelectedDate: Date;
  associatedCreneaux: Creneau[] = [];
  currentDate: Date = new Date();
  @Output() select: EventEmitter<Creneau> = new EventEmitter();

  constructor(
    private datePipe: DatePipe,
    public creneauSrv: CreneauService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.findAll();
    this.findByDate(new Date());
  }

  hasAtLeastOneDisponibilite(date: any) {
    return this
      .creneaux
      .some(creneau => this.getDateAsString(creneau.date as any) === this.getDateAsString(date) && !creneau.choosen);
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

  getDateAsString(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onDateChange(selectedDate: Date): void {
    const val = this.currentSelectedDate;
    this.previousSelectedDate = val;
    this.currentSelectedDate = selectedDate;
    if (this.getDateAsString(selectedDate) < this.getDateAsString(new Date())) {
      alert("Impossible de selectionner une date passée.");
      this.date = Object.assign(this.date, this.previousSelectedDate);
      return;
    }
    this.findByDate(selectedDate);
  }


  findByDate(date: Date) {
    this.spinner.show();
    this.selectedDate = null;
    this
      .creneauSrv
      .findByDate(this.getDateAsString(date))
      .pipe(first(), finalize(() => this.spinner.hide()))
      .subscribe((creneaux: Creneau[]) => {
        this.associatedCreneaux = creneaux;
      }, err => {
        this.creneauSrv.httpSrv.handleError(err);
      })
  }

  selectCreneau(creneau: Creneau) {
    this.selectedCreneau = creneau;
    this.select.emit(this.selectedCreneau);
  }

  allTaken() {
    return this.associatedCreneaux.every(c => c.choosen === true);
  }

}

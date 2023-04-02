import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Etat } from '../etat';
import { EtatService } from '../etat.service';

@Component({
  selector: 'app-etat-new',
  templateUrl: './etat-new.component.html',
  styleUrls: ['./etat-new.component.scss']
})
export class EtatNewComponent implements OnInit {

  etat: Etat;
  selectedEtatSuivant: Etat;
  etats: Etat[] = [];
  @Output() created: EventEmitter<Etat> = new EventEmitter();
  constructor(
    public etatSrv: EtatService,
    private spinner: NgxSpinnerService,
  ) {
    this.etat = new Etat();
  }

  ngOnInit(): void {
    this.findEtats()
  } 

  create() {
    if(this.selectedEtatSuivant) {
      this.etat.etatSuivant = { id: this.selectedEtatSuivant.id } as any;
    }
   
    this.spinner.show();
    this
      .etatSrv
      .store(this.etat)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((etat: Etat) => {
        this.created.emit(etat);
        this.etatSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.etat = new Etat();
      }, err => {
        this.etatSrv.httpSrv.handleError(err);
      })
  }

  findEtats() {
    this.spinner.show();
    this
      .etatSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((etats: Etat[]) => {
        this.etats = etats.filter(etat => etat.code != this.etat.code);
        this.etats = [...this.etats];
      }, err => {
        this.etatSrv.httpSrv.handleError(err);
      });
  }
}

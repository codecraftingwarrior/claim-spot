import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Etat } from '../etat';
import { EtatService } from '../etat.service';

@Component({
  selector: 'app-etat-edit',
  templateUrl: './etat-edit.component.html',
  styleUrls: ['./etat-edit.component.scss']
})
export class EtatEditComponent implements OnInit {

  etats: Etat[] = [];
  selectedEtatSuivant: Etat;
  @Input() etat: Etat;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  constructor(
    public etatSrv: EtatService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.findEtats();
    if (this.etat.etatSuivant) {
      this.selectedEtatSuivant = this.etat.etatSuivant;
    }
  }

  update() {
    if (this.selectedEtatSuivant) {
      this.etat.etatSuivant = this.selectedEtatSuivant;
    }
    this.spinner.show();
    this
      .etatSrv
      .update(this.etat)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((etat: Etat) => {
        this.updated.emit();
        this.etatSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.etatSrv.httpSrv.handleError(err);
      });
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

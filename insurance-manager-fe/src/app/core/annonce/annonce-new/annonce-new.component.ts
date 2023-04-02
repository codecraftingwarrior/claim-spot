import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Vehicule } from '../../vehicule/vehicule';
import { VehiculeService } from '../../vehicule/vehicule.service';
import { Annonce } from '../annonce';
import { AnnonceService } from '../annonce.service';

@Component({
  selector: 'app-annonce-new',
  templateUrl: './annonce-new.component.html',
  styleUrls: ['./annonce-new.component.scss']
})
export class AnnonceNewComponent implements OnInit {

  annonce: Annonce;
  @Output() created: EventEmitter<Vehicule> = new EventEmitter();
  @Input() vehicule: Vehicule;
  constructor(
    public annonceSrv: AnnonceService,
    private spinner: NgxSpinnerService,
    public vehiculeSrv: VehiculeService,
  ) {
    this.annonce = new Annonce();
    this.annonce.prix = 0;
  }

  ngOnInit(): void {

  }

  create() {
    this.spinner.show();
   // this.annonce.vehicule = { id: this.vehicule.id } as any;
    this.annonce.disabled = false;
    this.annonce.validated = false;
    this.annonce.libelle = this.vehicule.marque + ' ' + this.vehicule.modele;
    this.vehicule.annonce = this.annonce;
    this
      .vehiculeSrv
      .update(this.vehicule)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((vehicule: Vehicule) => {
        this.created.emit(vehicule);
        this.annonce = new Annonce();
      }, err => {
        this.annonceSrv.httpSrv.handleError(err);
      })
  }
}

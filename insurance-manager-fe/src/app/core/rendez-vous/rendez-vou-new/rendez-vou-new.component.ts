import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { RendezVous } from '../rendez-vou';
import { RendezVousService } from '../rendez-vou.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Creneau } from 'src/app/admin/creneau/creneau';
import { Accident } from '../../accident/accident';


@Component({
  selector: 'app-rendez-vou-new',
  templateUrl: './rendez-vou-new.component.html',
  styleUrls: ['./rendez-vou-new.component.scss']
})
export class RendezVousNewComponent implements OnInit {

  editor = ClassicEditor;
  rendezVou: RendezVous;
  selectedCreneau: Creneau;
  @Output() created: EventEmitter<RendezVous> = new EventEmitter();
  @Input() accident: Accident;
  constructor(
    public rendezVouSrv: RendezVousService,
    private spinner: NgxSpinnerService,
  ) {
    this.rendezVou = new RendezVous();
    this.rendezVou.description = '';
  }

  ngOnInit(): void {

  }

  create() {
    this.spinner.show();
    this.rendezVou.accident = {id: this.accident.id} as any;
    this.rendezVou.creneau = {id: this.selectedCreneau.id} as any;
    this
      .rendezVouSrv
      .store(this.rendezVou)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((rendezVou: RendezVous) => {
        this.created.emit(rendezVou);
        this.rendezVou = new RendezVous();
      }, err => {
        this.rendezVouSrv.httpSrv.handleError(err);
      })
  }

  onCreneauSelected(creneau: Creneau) {
    this.selectedCreneau = creneau;
  }
}

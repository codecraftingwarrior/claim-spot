import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { DetailAdversaire } from '../detail-adversaire';
import { DetailAdversaireService } from '../detail-adversaire.service';

@Component({
  selector: 'app-detail-adversaire-new',
  templateUrl: './detail-adversaire-new.component.html',
  styleUrls: ['./detail-adversaire-new.component.scss']
})
export class DetailAdversaireNewComponent implements OnInit {

detailAdversaire: DetailAdversaire;
  @Output() created: EventEmitter<DetailAdversaire> = new EventEmitter();
  constructor(
    public detailAdversaireSrv: DetailAdversaireService,
    private spinner: NgxSpinnerService,
  ) {
    this.detailAdversaire = new DetailAdversaire();
  }

  ngOnInit(): void {

  }

  create() {
    this.spinner.show();
    this
      .detailAdversaireSrv
      .store(this.detailAdversaire)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((detailAdversaire: DetailAdversaire) => {
        this.created.emit(detailAdversaire);
        this.detailAdversaireSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.detailAdversaire = new DetailAdversaire();
      }, err => {
        this.detailAdversaireSrv.httpSrv.handleError(err);
      })
  }
}

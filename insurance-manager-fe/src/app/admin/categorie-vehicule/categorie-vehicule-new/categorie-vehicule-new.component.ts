import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { CategorieVehicule } from '../categorie-vehicule';
import { CategorieVehiculeService } from '../categorie-vehicule.service';

@Component({
  selector: 'app-categorie-vehicule-new',
  templateUrl: './categorie-vehicule-new.component.html',
  styleUrls: ['./categorie-vehicule-new.component.scss']
})
export class CategorieVehiculeNewComponent implements OnInit {

  icons = [
    { label: 'Berline', value: 'bx bxs-car' },
    { label: 'Poids Lourd', value: 'fas fa-truck-moving' },
    { label: 'Camionnette', value: 'fas fa-shuttle-van' },
    { label: 'Transport en commun', value: 'bx bxs-bus-school' },
    { label: 'Deux Roues', value: 'fas fa-motorcycle' },
    { label: '4 x 4 (SUV)', value: 'fas fa-car-side' }
  ];
  categorieVehicule: CategorieVehicule;
  @Output() created: EventEmitter<CategorieVehicule> = new EventEmitter();

  constructor(
    public categorieVehiculeSrv: CategorieVehiculeService,
    private spinner: NgxSpinnerService,
  ) {
    this.categorieVehicule = new CategorieVehicule();
  }

  ngOnInit(): void {

  }

  create() {
    this.spinner.show();
    this
      .categorieVehiculeSrv
      .store(this.categorieVehicule)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((categorieVehicule: CategorieVehicule) => {
        this.created.emit(categorieVehicule);
        this.categorieVehiculeSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.categorieVehicule = new CategorieVehicule();
      }, err => {
        this.categorieVehiculeSrv.httpSrv.handleError(err);
      })
  }
}

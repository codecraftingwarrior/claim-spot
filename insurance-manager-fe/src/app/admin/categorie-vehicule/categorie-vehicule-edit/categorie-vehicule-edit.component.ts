import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { CategorieVehicule } from '../categorie-vehicule';
import { CategorieVehiculeService } from '../categorie-vehicule.service';

@Component({
  selector: 'app-categorie-vehicule-edit',
  templateUrl: './categorie-vehicule-edit.component.html',
  styleUrls: ['./categorie-vehicule-edit.component.scss']
})
export class CategorieVehiculeEditComponent implements OnInit {

  @Input() categorieVehicule: CategorieVehicule;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  icons = [
    { label: 'Berline', value: 'bx bxs-car' },
    { label: 'Poids Lourd', value: 'fas fa-truck-moving' },
    { label: 'Camionnette', value: 'fas fa-shuttle-van' },
    { label: 'Transport en commun', value: 'bx bxs-bus-school' },
    { label: 'Deux Roues', value: 'fas fa-motorcycle' },
  ];
  constructor(
    public categorieVehiculeSrv: CategorieVehiculeService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  update() {
    this.spinner.show();
    this
      .categorieVehiculeSrv
      .update(this.categorieVehicule)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((categorieVehicule: CategorieVehicule) => {
        this.updated.emit();
        this.categorieVehiculeSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.categorieVehiculeSrv.httpSrv.handleError(err);
      });
  }

}

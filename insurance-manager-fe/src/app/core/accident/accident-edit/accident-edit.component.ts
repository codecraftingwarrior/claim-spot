import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { CategorieVehicule } from 'src/app/admin/categorie-vehicule/categorie-vehicule';
import { CategorieVehiculeService } from 'src/app/admin/categorie-vehicule/categorie-vehicule.service';
import { Vehicule } from '../../vehicule/vehicule';
import { VehiculeService } from '../../vehicule/vehicule.service';
import { Accident } from '../accident';
import { AccidentService } from '../accident.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DetailAdversaire } from '../../detail-adversaire/detail-adversaire';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-accident-edit',
  templateUrl: './accident-edit.component.html',
  styleUrls: ['./accident-edit.component.scss']
})
export class AccidentEditComponent implements OnInit {

  @Input() accident: Accident;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  editor = ClassicEditor;
  current = 0;
  vehicules: Vehicule[] = [];
  selectedVehicule: Vehicule;
  categorieVehicules: CategorieVehicule[] = [];
  selectedCategorieVehicule: CategorieVehicule;
  loadingIndicator = false;
  detailAdversaire: DetailAdversaire = new DetailAdversaire();
  currentUser: ApplicationUser;
  genres: any = [
    { icon: 'fa fa-male', value: 'Homme' },
    { icon: 'fa fa-female', value: 'Femme' }
  ]
  constructor(
    public accidentSrv: AccidentService,
    private spinner: NgxSpinnerService,
    public categorieVehiculeSrv: CategorieVehiculeService,
    public vehiculeSrv: VehiculeService,
    public modal: NzModalService,
    public authSrv: AuthService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.selectedVehicule = this.accident.vehicule;
    this.selectedCategorieVehicule = this.accident.detailAdversaire.categorieVehicule;
    this.currentUser = this.authSrv.fetchCurrentUser();
    this.accident = { ...this.accident };
    this.accident.heure = this.accident.heure.slice(0, -3);
    this.detailAdversaire = this.accident.detailAdversaire;
    this.findVehicules();
    this.findCategorieVehicules();
  }

  update() {
    this.spinner.show();
    this.loadingIndicator = true;
    this.detailAdversaire.categorieVehicule = { id: this.selectedCategorieVehicule.id } as any;
    this.accident.applicationUser = { id: this.currentUser.id } as any;
    this.accident.vehicule = { id: this.selectedVehicule.id } as any;
    this.accident.etat = { id: this.accident.etat.id } as any;
    this.accident.detailAdversaire = this.detailAdversaire;
    this
      .accidentSrv
      .update(this.accident)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((accident: Accident) => {
        this.updated.emit();
        this.accidentSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });
  }

  findVehicules() {
    this.spinner.show();
    this
      .vehiculeSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((vehicules: Vehicule[]) => {
        this.vehicules = vehicules;
      }, err => {
        this.vehiculeSrv.httpSrv.handleError(err);
      });
  }

  findCategorieVehicules() {
    this.spinner.show();
    this
      .categorieVehiculeSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((categorieVehicules: CategorieVehicule[]) => {
        this.categorieVehicules = categorieVehicules;
      }, err => {
        this.categorieVehiculeSrv.httpSrv.handleError(err);
      });
  }

  checkDate(date: Date) {
    if (date > (new Date())) {
      this.accident.date = new Date();
      const modal = this.modal['error']({
        nzTitle: `Attention`,
        nzContent: `Vous ne pouvez pas choisir cette date.`,
      });
      setTimeout(() => modal.close(), 2000);
    }
  }

  onIndexChange(event: number): void {
    this.current = event;
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

}

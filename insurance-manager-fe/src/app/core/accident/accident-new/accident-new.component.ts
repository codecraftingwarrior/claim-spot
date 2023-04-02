import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Accident } from '../accident';
import { AccidentService } from '../accident.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { VehiculeService } from '../../vehicule/vehicule.service';
import { Vehicule } from '../../vehicule/vehicule';
import { DetailAdversaire } from '../../detail-adversaire/detail-adversaire';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { CategorieVehiculeService } from 'src/app/admin/categorie-vehicule/categorie-vehicule.service';
import { CategorieVehicule } from 'src/app/admin/categorie-vehicule/categorie-vehicule';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-accident-new',
  templateUrl: './accident-new.component.html',
  styleUrls: ['./accident-new.component.scss']
})
export class AccidentNewComponent implements OnInit {

  vehicules: Vehicule[] = [];
  selectedVehicule: Vehicule;
  editor = ClassicEditor;
  accident: Accident;
  current = 0;
  loadingIndicator = false;
  @Output() created: EventEmitter<Accident> = new EventEmitter();
  @Output() ended: EventEmitter<any> = new EventEmitter();
  detailAdversaire: DetailAdversaire;
  currentUser: ApplicationUser;
  categorieVehicules: CategorieVehicule[] = [];
  selectedCategorieVehicule: CategorieVehicule;
  genres: any = [
    { icon: 'fa fa-male', value: 'Homme' },
    { icon: 'fa fa-female', value: 'Femme' }
  ]
  constructor(
    public accidentSrv: AccidentService,
    private spinner: NgxSpinnerService,
    public vehiculeSrv: VehiculeService,
    public authSrv: AuthService,
    public categorieVehiculeSrv: CategorieVehiculeService,
    public modal: NzModalService,
  ) {
    this.detailAdversaire = new DetailAdversaire();
    this.accident = new Accident();
    this.accident.details = '';
    this.detailAdversaire.description = '';
  }

  ngOnInit(): void {
    this.currentUser = this.authSrv.fetchCurrentUser();
    this.findVehicules();
    this.findCategorieVehicules();
  }

  create() {
    this.spinner.show();
    this.loadingIndicator = true;
    this.detailAdversaire.categorieVehicule = { id: this.selectedCategorieVehicule.id } as any;
    this.accident.applicationUser = { id: this.currentUser.id } as any;
    this.accident.vehicule = { id: this.selectedVehicule.id } as any;
    this.accident.detailAdversaire = this.detailAdversaire;
    this
      .accidentSrv
      .store(this.accident)
      .pipe(
        first(),
        finalize(() => { this.spinner.hide(); this.loadingIndicator = false })
      )
      .subscribe((accident: Accident) => {
        this.created.emit(accident);
        this.accidentSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.accident = new Accident();
        this.current = 3;
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      })
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

  end() {
    this.ended.emit();
  }
}

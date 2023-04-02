import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { CategorieVehicule } from 'src/app/admin/categorie-vehicule/categorie-vehicule';
import { CategorieVehiculeService } from 'src/app/admin/categorie-vehicule/categorie-vehicule.service';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';
import {UploadcareService} from '../../../shared/services/uploadcare.service';

@Component({
  selector: 'app-vehicule-edit',
  templateUrl: './vehicule-edit.component.html',
  styleUrls: ['./vehicule-edit.component.scss']
})
export class VehiculeEditComponent implements OnInit {

  currentUser: ApplicationUser;
  vehiculeImage: any = '';
  croppedVehiculeImage: any = '';
  categorieVehicules: CategorieVehicule[] = [];
  selectedCategorieVehicule: CategorieVehicule;
  @Input() vehicule: Vehicule;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  constructor(
    public vehiculeSrv: VehiculeService,
    private spinner: NgxSpinnerService,
    public categorieVehiculeSrv: CategorieVehiculeService,
    public uploadcare: UploadcareService,
  ) { }

  ngOnInit(): void {
    this.vehicule = { ...this.vehicule };
    this.selectedCategorieVehicule = this.vehicule.categorie;
    this.findCategorieVehicules();
    this.fetchCurrentUser();
  }
  fetchCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as ApplicationUser;
  }

  async update() {
    this.spinner.show();

    const files: FileList = this.vehiculeImage.target.files;
    let path: { file: string } = await this.uploadcare.completeUpload(files, () => this.spinner.hide());

    this.vehicule.applicationUser = { id: this.currentUser.id } as any;
    this.vehicule.categorie = { id: this.selectedCategorieVehicule.id } as any;
    this.vehicule.image =  'https://ucarecdn.com/' + path.file + '/';
    this.vehicule.imgUrl =  'https://ucarecdn.com/' + path.file + '/';

    const $update: Observable<Vehicule> = this.vehiculeSrv.update(this.vehicule);
    $update
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((vehicule: Vehicule) => {
        this.updated.emit();
        this.vehiculeSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
        this.croppedVehiculeImage = '';
        this.vehiculeImage = '';
        this.selectedCategorieVehicule = new CategorieVehicule();
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

  onImageChoosed(event: any): void {
    this.vehiculeImage = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedVehiculeImage = event.base64;
  }

  loadImageFailed() {
    this.vehiculeSrv.httpSrv.notificationService.displayError('Impossible de charger l\'image');
  }

}

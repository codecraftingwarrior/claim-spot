import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { CategorieVehicule } from 'src/app/admin/categorie-vehicule/categorie-vehicule';
import { CategorieVehiculeService } from 'src/app/admin/categorie-vehicule/categorie-vehicule.service';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';
import {UploadcareService} from '../../../shared/services/uploadcare.service';

@Component({
  selector: 'app-vehicule-new',
  templateUrl: './vehicule-new.component.html',
  styleUrls: ['./vehicule-new.component.scss']
})
export class VehiculeNewComponent implements OnInit {

  selectedCategorieVehicule: CategorieVehicule;
  categorieVehicules: CategorieVehicule[] = [];
  vehicule: Vehicule;
  vehiculeImage: any = '';
  croppedVehiculeImage: any = '';
  @Output() created: EventEmitter<Vehicule> = new EventEmitter();
  currentUser: ApplicationUser;
  constructor(
    public vehiculeSrv: VehiculeService,
    private spinner: NgxSpinnerService,
    public categorieVehiculeSrv: CategorieVehiculeService,
    public uploadcare: UploadcareService,
  ) {
    this.vehicule = new Vehicule();
  }

  ngOnInit(): void {
    this.findCategorieVehicules();
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as ApplicationUser;
  }

 public async create()  {
    await this.spinner.show();

    const files: FileList = this.vehiculeImage.target.files;
    let path: { file: string } = await this.uploadcare.completeUpload(files, () => this.spinner.hide());

    this.vehicule.applicationUser = { id: this.currentUser.id } as any;
    this.vehicule.categorie = { id: this.selectedCategorieVehicule.id } as any;
      this.vehicule.image =  'https://ucarecdn.com/' + path.file + '/';
      this.vehicule.imgUrl =  'https://ucarecdn.com/' + path.file + '/';

    this
      .vehiculeSrv
      .store(this.vehicule)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((vehicule: Vehicule) => {
        vehicule.categorie = this.selectedCategorieVehicule;
        this.created.emit(vehicule);
        this.vehiculeSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.croppedVehiculeImage = '';
        this.vehiculeImage = '';
        this.selectedCategorieVehicule = new CategorieVehicule();
        this.vehicule = new Vehicule();
      }, err => {
        this.vehiculeSrv.httpSrv.handleError(err);
      })
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

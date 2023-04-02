import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize, first} from 'rxjs/operators';
import {Accident} from '../../accident/accident';
import {Photo} from '../photo';
import {PhotoService} from '../photo.service';
import {UploadcareService} from '../../../shared/services/uploadcare.service';

@Component({
  selector: 'app-photo-new',
  templateUrl: './photo-new.component.html',
  styleUrls: ['./photo-new.component.scss']
})
export class PhotoNewComponent implements OnInit {

  photo: Photo;
  photos: Set<Photo> = new Set();
  croppedImage = '';
  image: any = '';
  selectedPhoto: Photo;
  @Output() created: EventEmitter<Photo[]> = new EventEmitter();
  @Input() accident: Accident;

  constructor(
    public photoSrv: PhotoService,
    private spinner: NgxSpinnerService,
    public uploadcare: UploadcareService,
  ) {
    this.photos.add({filename: '', url: '', isDetail: false, image: ''} as any);
  }

  ngOnInit(): void {

  }

  async create() {
    await this.spinner.show();
    const data = new FormData();
    for (const {index, photo} of Array.from(this.photos).map((photo, index) => ({index, photo}))) {
      photo.filename = 'auto';
      photo.isDetail = false;
      photo.accident = {id: this.accident.id} as any;
      photo.volatileName = `file${index}`;
      const ext = photo.choosedImage.item(0).name.split('.')[1];

      if (!['png', 'jpeg', 'jpg'].includes(ext.toLocaleLowerCase())) {
        this.uploadcare.toastr.error('Ce type de fichier n\'est pas pris en compte veuillez choisir une image');
        await this.spinner.hide();
        continue;
      }

      const newFilename = this.uploadcare.makeID(16) + '.' + ext;
      const image = new File([photo.choosedImage.item(0)], `${newFilename}`, {type: photo.choosedImage.item(0).type});
      data.append(photo.volatileName, image);
    }

    let paths: any;
    try {
      paths = await this.uploadcare.upload(data).toPromise();
      for(const photo of Array.from(this.photos)) {
        photo.image = 'https://ucarecdn.com/' + paths[`${photo.volatileName}`] + '/'
      }
    } catch (error: any) {
      console.log(error);
      this.photoSrv.toastr.error('Une erreur est survenu lors de l\'upload du fichier');
      return;
    }

    this
      .photoSrv
      .storeMultiple(Array.from(this.photos))
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((photos: Photo[]) => {
        this.created.emit(photos);
        this.photos = new Set();
      }, err => {
        this.photoSrv.httpSrv.handleError(err);
      });
  }

  isAllValid() {
    return Array.from(this.photos).every((photo) => photo.image.length > 1);
  }

  addLine() {
    this.photos.add({filename: '', url: '', isDetail: false, image: ''} as any);
  }

  dropLine(photo: Photo) {
    this.photos.delete(photo);
    this.image = '';
    this.croppedImage = '';
  }

  onImageChoosed(event: any, photo: Photo): void {
    this.selectedPhoto = photo;
    this.image = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.photoSrv.httpSrv.notificationService.displayError('Impossible de charger l\'image');
  }

  setCurrentEncodeImage() {
    this.selectedPhoto.image = this.croppedImage;
    this.selectedPhoto.choosedImage = this.image.target.files;
    this.selectedPhoto = null;
    this.croppedImage = '';
    this.image = '';
  }
}

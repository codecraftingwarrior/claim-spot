import { Component, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { UserService } from 'src/app/admin/user/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UploadcareService } from 'src/app/shared/services/uploadcare.service';

@Component({
  selector: 'app-espace-personnel',
  templateUrl: './espace-personnel.component.html',
  styleUrls: ['./espace-personnel.component.scss']
})
export class EspacePersonnelComponent implements OnInit {

  currentUser: ApplicationUser = new ApplicationUser();
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
  userImage: any = '';
  croppedUserImage: any = '';
  isVisibleImageModal = false;
  passwordType: { currentPassword: string, newPassword: string, confirmPassword: string }
    = { currentPassword: 'password', newPassword: 'password', confirmPassword: 'password' };
  isDisplayImageModalVisible = false;
  constructor(
    public authSrv: AuthService,
    public userSrv: UserService,
    private spinner: NgxSpinnerService,
    public modal: NzModalService,
    private nzImageSrv: NzImageService,
    private uploadcare: UploadcareService,
  ) { }

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as ApplicationUser;
  }

  onImageChoosed(event: any): void {
    this.userImage = event;
    this.isVisibleImageModal = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedUserImage = event.base64;
  }

  loadImageFailed() {
    this.userSrv.httpSrv.notificationService.displayError('Impossible de charger l\'image');
  }

  displayImageProfile() {
    this
      .nzImageSrv
      .preview([
        { src: this.currentUser.imageFilepath || 'assets/img/defaults/54-512.png', alt: 'Votre photo de profile' },
      ], { nzZoom: 0.9, nzRotate: 0, nzNoAnimation: false });

  }

  async updateProfileImage() {
    await this.spinner.show();
    const files: FileList = this.userImage.target.files;
    const ext = files.item(0).name.split('.')[1];

    if (!['png', 'jpeg', 'jpg'].includes(ext.toLowerCase())) {
      this.userSrv.toastr.error('Ce type de fichier n\'est pas pris en compte veuillez choisir une image');
      await this.spinner.hide();
      return;
    }

    const data = new FormData();
    const newFilename = this.uploadcare.makeID(16) + '.' + ext;
    const image = new File([files.item(0)], `${newFilename}`, { type: files.item(0).type });

    data.append(`file`, image);

    let path: { file: string } = { file: '' };
    try {
      path = await this.uploadcare.upload(data).toPromise();
      console.log(path);
    } catch (error: any) {
      console.log(error);
      this.userSrv.toastr.error('Une erreur est survenu lors de l\'upload du fichier');
      return;
    }

    try {

      this.currentUser.authorities = [];
      this.currentUser.grantedAuthorities = [];
      this.currentUser.roles = this.currentUser.roles.map(role => ({ id: role.id })) as any;
      if (this.currentUser.formule) {
        this.currentUser.formule = ({ id: this.currentUser.formule.id }) as any;
      }
      this.currentUser.imageFilepath = 'https://ucarecdn.com/' + path.file + '/';
      this.currentUser.imageFilename =  `${newFilename}`;

      await this.userSrv.update(this.currentUser).toPromise();

      this.isVisibleImageModal = false;
      this.authSrv.getCurrentUser();
      this.userSrv.toastr.success('Votre photo de profile à été mise à jour.');

    } catch (error: any) {

      console.log(error);
      this.userSrv.toastr.error('Une erreur est survenu lors de la mise à jour.');
      return;

    } finally {

      this.spinner.hide();

    }

  }

  closeImageModal() {
    this.userImage = '';
    this.croppedUserImage = '';
    this.isVisibleImageModal = false;
  }

}

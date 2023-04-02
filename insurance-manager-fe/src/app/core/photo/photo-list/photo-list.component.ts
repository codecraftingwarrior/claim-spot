import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Accident } from '../../accident/accident';
import { Photo } from '../photo';
import { photoColumns } from '../photo.columns';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  selectedPhoto: Photo;
  columns = photoColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  currentIndex = { to: 0 };
  deleting = false;

  @Input() accident: Accident;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public photoSrv: PhotoService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.photos = this.accident.photos;
  }


  refresh() {
    this.spinner.show();
    this
      .photoSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => { this.spinner.hide(); })
      ).subscribe((photos: Photo[]) => {
        this.photos = photos;
        this.photos = [...this.photos];
      }, err => {
        this.photoSrv.httpSrv.handleError(err);
      })
  }

  onImageChanged(event: any) {
    this.currentIndex = event;
  }

  deleteCurrentImage() {
    this.delete(this.accident.photos[this.currentIndex.to]);
  }


  delete(photo: Photo) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .photoSrv
            .destroy(photo)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.accident.photos = this.accident.photos.filter(u => u.id !== photo.id);
            this.photoSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.photoSrv.httpSrv.handleError(err);
          })
    });
  }

}

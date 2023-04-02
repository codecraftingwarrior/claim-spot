import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Accident } from '../accident';
import { AccidentService } from '../accident.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonService } from 'src/app/shared/services/common.service';
import { EtatService } from 'src/app/admin/etat/etat.service';
import { Etat } from 'src/app/admin/etat/etat';
import { AWAITING_EXPERTISE, AWAITING_PICS, AWAITING_VALIDATION } from 'src/app/admin/etat/workflow';
import { RendezVous } from '../../rendez-vous/rendez-vou';
import { Photo } from '../../photo/photo';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { PhotoService } from '../../photo/photo.service';
import { RendezVousService } from '../../rendez-vous/rendez-vou.service';
import { NzImageService } from 'ng-zorro-antd/image';


@Component({
  selector: 'app-accident-manager',
  templateUrl: './accident-manager.component.html',
  styleUrls: ['./accident-manager.component.scss']
})
export class AccidentManagerComponent implements OnInit {

  temp = [];
  accidents: Accident[] = [];
  isCarDetailModalVisible = false;
  selectedAccident: Accident;
  mail: { to: string; object: string; content: string } = { to: '', object: 'Demande complément d\'information', content: '' };
  editor = ClassicEditor;
  isMailModalVisible = false;
  confirmModal: NzModalRef;
  etats: Etat[] = [];
  selectedState: any;
  attenteValidationCode = AWAITING_VALIDATION;
  attenteExpertiseCode = AWAITING_EXPERTISE;
  attentePhotoCode = AWAITING_PICS;
  isRvModalVisible = false;
  isPhotoNewModalVisible = false;
  isImgManagerModalVisible = false;
  isEvaluationModalVisible = false;
  constructor(
    public accidentSrv: AccidentService,
    private spinner: NgxSpinnerService,
    public modal: NzModalService,
    public authSrv: AuthService,
    public commonSrv: CommonService,
    public etatSrv: EtatService,
    public nzContextMenuService: NzContextMenuService,
    public photoSrv: PhotoService,
    public rendezVousSrv: RendezVousService,
    public nzImageSrv: NzImageService,
  ) { }

  ngOnInit(): void {

  }

  findEtats() {
    this.nzContextMenuService.close(true);
    this
      .etatSrv
      .findAll()
      .pipe(
        first(),
      ).subscribe((etats: Etat[]) => {
        this.etats = etats;
        this.selectedState = etats.find(e => e.code === AWAITING_VALIDATION);
        this.findByEtat();
      }, err => {
        this.etatSrv.httpSrv.handleError(err);
      })
  }

  findAwaitingExpertise() {
    this.nzContextMenuService.close(true);
    this
      .accidentSrv
      .findAwaitingExpertise()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((accidents: Accident[]) => {
        this.accidents = accidents;
        this.temp = accidents;
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });
  }

  findByEtat() {
    this.spinner.show();
    this
      .accidentSrv
      .findByEtat(this.selectedState)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((accidents: Accident[]) => {
        this.accidents = accidents;
        this.temp = accidents;
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {

      const isFounded =
        d.code.toLowerCase().indexOf(val) !== -1 ||
        d.lieu.toLowerCase().indexOf(val) !== -1 ||
        d.vehicule.marque.toLowerCase().indexOf(val) !== -1 ||
        d.vehicule.modele.toLowerCase().indexOf(val) !== -1 ||
        false
      return isFounded;
    });

    this.accidents = temp;
  }

  displayCarDetailModal(accident: Accident) {
    this.isCarDetailModalVisible = true;
    this.selectedAccident = accident;
  }

  displayNotifyModal(accident: Accident) {
    this.isMailModalVisible = true;
    this.selectedAccident = accident;
  }

  displayRendezVousNewModal(accident: Accident) {
    this.isRvModalVisible = true;
    this.selectedAccident = accident;
  }

  displayPhotoNewModal(accident: Accident) {
    this.isPhotoNewModalVisible = true;
    this.selectedAccident = accident;
  }

  displayImageManagerModal(accident: Accident) {
    this.isImgManagerModalVisible = true;
    this.selectedAccident = accident;
  }

  displayEvaluationModal(accident: Accident) {
    this.isEvaluationModalVisible = true;
    if (!accident.montantRemboursement) {
      accident.montantRemboursement = 0;
    }
    if (!accident.motantReparartion) {
      accident.motantReparartion = 0;
    }
    this.selectedAccident = { ...accident };
  }

  validate(accident: Accident) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous vraiment valider ce dossier  ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise<Accident>((resolve, reject) => {
          this
            .accidentSrv
            .validate(accident)
            .pipe(
              first(),
              finalize(() => this.spinner.hide())
            ).subscribe((accident) => {
              resolve(accident)
            }, err => {
              reject(err);
            });
        })
          .then((accident) => {
            this.accidents = this.accidents.filter(acc => acc.id !== accident.id);
            this.accidentSrv.httpSrv.notificationService.displaySuccess("Ce dossier a été validé avec succès.");
          })
          .catch((err) => {
            this.accidentSrv.httpSrv.handleError(err);
          })
    });
  }

  notify() {
    this.spinner.show();
    this.mail.to = this.selectedAccident.applicationUser.username;
    this
      .commonSrv
      .sendMail(this.mail)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((resp) => {
        this.accidentSrv.httpSrv.notificationService.displaySuccess("Notification effectué avec succés.");
        this.isMailModalVisible = false;
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });

  }

  fenceAndNotify(accident?: Accident) {
    this.spinner.show();
    this
      .accidentSrv
      .fenceAndNotify(this.selectedAccident ? this.selectedAccident : accident)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((accidentUpdated) => {
        this.accidentSrv.httpSrv.notificationService.displaySuccess("Le dossier a été cloturé avec succés. L'assuré a aussi été informé pour venir récupérer son chéque.");
        this.isEvaluationModalVisible = false;
        this.selectedAccident = null;
        this.accidents = this.accidents.filter(acc => acc.id !== accidentUpdated.id);
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });

  }

  onCreatedRendezVous(rendezVous: RendezVous) {
    this.selectedAccident.rendezVous = rendezVous;
    this.findByEtat();
    this.accidentSrv.httpSrv.notificationService.displaySuccess('Le rendez - vous a bien été fixé. Une notification a été envoyé à l\'assuré afin qu\'il en prenne connaissance.');
    this.isRvModalVisible = false;
  }

  onCreatedPhoto(photos: Photo[]) {
    this.accidentSrv.httpSrv.notificationService.displaySuccess('Les photos ont été enregistrés avec succès.');
    this.selectedAccident.photos = photos;
    this.isPhotoNewModalVisible = false;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  switchToAwaitingExpertiseState(accident: Accident) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous vraiment mettre ce dossier en attente d\'expertise  ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise<Accident>((resolve, reject) => {
          this
            .accidentSrv
            .switchToAwaitingExpertiseState(accident)
            .pipe(
              first(),
              finalize(() => this.spinner.hide())
            ).subscribe((accident) => {
              resolve(accident)
            }, err => {
              reject(err);
            });
        })
          .then((accident) => {
            this.accidents = this.accidents.filter(acc => acc.id !== accident.id);
            this.accidentSrv.httpSrv.notificationService.displaySuccess("Ce dossier est maintenant en attente d'expertise.");
          })
          .catch((err) => {
            this.accidentSrv.httpSrv.handleError(err);
          })
    });
  }

  displayDeclartionImage(accident: Accident) {
    this
      .nzImageSrv
      .preview(accident.photos.map(photo => ({ src: photo.image, alt: 'Photo' })), { nzZoom: 0.9, nzRotate: 0, nzNoAnimation: false });

  }


  evaluate() {
    this.spinner.show();
    this
      .accidentSrv
      .update(this.selectedAccident)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((accident: Accident) => {
        this.selectedAccident = null;
        this.accidentSrv.httpSrv.notificationService.displaySuccess('Vos évaluations ont été enregistrés avec succès.');
        this.isEvaluationModalVisible = false;
        this.findAwaitingExpertise();
      }, err => {
        this.accidentSrv.httpSrv.handleError(err);
      });
  }



}

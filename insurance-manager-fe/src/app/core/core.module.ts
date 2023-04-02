import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CoreRoutingModule } from './core-routing.module';
import { CoreLayoutComponent } from './core-layout.component';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../pages/pages.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TagInputModule } from 'ngx-chips';
import { NgxCurrencyModule } from 'ngx-currency';
import { EspacePersonnelComponent } from './espace-personnel/espace-personnel.component';
import { AnnonceListComponent } from './annonce/annonce-list/annonce-list.component';
import { AnnonceNewComponent } from './annonce/annonce-new/annonce-new.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { VehiculeDetailComponent } from './vehicule/vehicule-detail/vehicule-detail.component';
import { VehiculeEditComponent } from './vehicule/vehicule-edit/vehicule-edit.component';
import { VehiculeListComponent } from './vehicule/vehicule-list/vehicule-list.component';
import { VehiculeNewComponent } from './vehicule/vehicule-new/vehicule-new.component';
import { AccidentListComponent } from './accident/accident-list/accident-list.component';
import { AccidentEditComponent } from './accident/accident-edit/accident-edit.component';
import { AccidentDetailComponent } from './accident/accident-detail/accident-detail.component';
import { AccidentNewComponent } from './accident/accident-new/accident-new.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DetailAdversaireNewComponent } from './detail-adversaire/detail-adversaire-new/detail-adversaire-new.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { AccidentManagerComponent } from './accident/accident-manager/accident-manager.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RendezVousNewComponent } from './rendez-vous/rendez-vou-new/rendez-vou-new.component';
import { RendezVousDetailComponent } from './rendez-vous/rendez-vou-detail/rendez-vou-detail.component';
import { AdminModule } from '../admin/admin.module';
import { PhotoListComponent } from './photo/photo-list/photo-list.component';
import { PhotoNewComponent } from './photo/photo-new/photo-new.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzImageModule } from 'ng-zorro-antd/image';
import { PaymentSuccessComponent } from '../payment/payment-success/payment-success.component';
import { PaymentFailedComponent } from '../payment/payment-failed/payment-failed.component';


@NgModule({
  declarations: [
    CoreLayoutComponent,
    EspacePersonnelComponent,
    MonCompteComponent,
    VehiculeDetailComponent,
    VehiculeListComponent,
    VehiculeEditComponent,
    VehiculeNewComponent,
    AnnonceNewComponent,
    AnnonceListComponent,
    AccidentListComponent,
    AccidentEditComponent,
    AccidentDetailComponent,
    AccidentNewComponent,
    DetailAdversaireNewComponent,
    AccidentManagerComponent,
    RendezVousNewComponent,
    RendezVousDetailComponent,
    PhotoListComponent,
    PhotoNewComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    AdminModule,
    PagesModule,
    NgxSpinnerModule,
    NgxMaskModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzTabsModule,
    NzIconModule,
    NzModalModule,
    NzCardModule,
    NzDescriptionsModule,
    NgSelectModule,
    NzToolTipModule,
    TagInputModule,
    NgxCurrencyModule,
    NgxDatatableModule,
    ImageCropperModule,
    NzTagModule,
    NzDatePickerModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
    NzStepsModule,
    NzButtonModule,
    NzResultModule,
    NzCollapseModule,
    NzBadgeModule,
    NzRadioModule,
    NzDropDownModule,
    NzCarouselModule,
    NzImageModule,

  ],
   exports: [AnnonceListComponent],
   providers: [DatePipe]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PagesModule } from '../pages/pages.module';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleNewComponent } from './role/role-new/role-new.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RoleManagePermissionComponent } from './role/role-manage-permission/role-manage-permission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

import { TagInputModule } from 'ngx-chips';
import { FormuleListComponent } from './formule/formule-list/formule-list.component';
import { FormuleDetailComponent } from './formule/formule-detail/formule-detail.component';
import { FormuleEditComponent } from './formule/formule-edit/formule-edit.component';
import { FormuleNewComponent } from './formule/formule-new/formule-new.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { OptionDetailComponent } from './option/option-detail/option-detail.component';
import { OptionListComponent } from './option/option-list/option-list.component';
import { OptionNewComponent } from './option/option-new/option-new.component';
import { OptionEditComponent } from './option/option-edit/option-edit.component';
import { CategorieVehiculeDetailComponent } from './categorie-vehicule/categorie-vehicule-detail/categorie-vehicule-detail.component';
import { CategorieVehiculeListComponent } from './categorie-vehicule/categorie-vehicule-list/categorie-vehicule-list.component';
import { CategorieVehiculeEditComponent } from './categorie-vehicule/categorie-vehicule-edit/categorie-vehicule-edit.component';
import { CategorieVehiculeNewComponent } from './categorie-vehicule/categorie-vehicule-new/categorie-vehicule-new.component';
import { EtatListComponent } from './etat/etat-list/etat-list.component';
import { EtatDetailComponent } from './etat/etat-detail/etat-detail.component';
import { EtatNewComponent } from './etat/etat-new/etat-new.component';
import { EtatEditComponent } from './etat/etat-edit/etat-edit.component';
import { CreneauListComponent } from './creneau/creneau-list/creneau-list.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { CreneauSelectionComponent } from './creneau/creneau-selection/creneau-selection.component';
import { NzResultModule } from 'ng-zorro-antd/result';




@NgModule({
  exports: [
    CreneauSelectionComponent
  ],
  declarations: [
    AdminComponent,
    UserNewComponent,
    UserListComponent,
    RoleNewComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleDetailComponent,
    RoleManagePermissionComponent,
    UserEditComponent,
    UserDetailComponent,
    FormuleListComponent,
    FormuleDetailComponent,
    FormuleEditComponent,
    FormuleNewComponent,
    OptionListComponent,
    OptionDetailComponent,
    OptionNewComponent,
    OptionEditComponent,
    CategorieVehiculeDetailComponent,
    CategorieVehiculeListComponent,
    CategorieVehiculeEditComponent,
    CategorieVehiculeNewComponent,
    EtatListComponent,
    EtatDetailComponent,
    EtatNewComponent,
    EtatEditComponent,
    CreneauListComponent,
    CreneauSelectionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule,
    SharedModule,
    PagesModule,
    TagInputModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    NgxSpinnerModule,
    NzIconModule,
    NzPageHeaderModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzRadioModule,
    NzSwitchModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
    NzCalendarModule,
    NzBadgeModule,
    NgxCurrencyModule,
    NzDescriptionsModule,
    NzResultModule,
    FormsModule,
  ],
  providers: [DatePipe]
})
export class AdminModule { }

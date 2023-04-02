import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AccessDeniedIndicatorComponent } from './components/access-denied-indicator/access-denied-indicator.component';
import { EmptyIndicatorComponent } from './components/empty-indicator/empty-indicator.component';
import { RouterModule } from '@angular/router';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { FieldValidationStateComponent } from './components/field-validation-state/field-validation-state.component';
import { HasAnyResourceAuthorityPipe } from './pipes/has-any-resource-authority.pipe';
import { HasAuthorityPipe } from './pipes/has-authority.pipe';
import { CanViewPipe } from './pipes/can-view.pipe';
import { CanListPipe } from './pipes/can-list.pipe';
import { CanWritePipe } from './pipes/can-write.pipe';
import { CanDeletePipe } from './pipes/can-delete.pipe';
import { TimeagoModule } from 'ngx-timeago';




@NgModule({
  declarations: [
    FilterByPipe,
    SafeUrlPipe,
    EmptyIndicatorComponent,
    AccessDeniedIndicatorComponent,
    FieldValidationStateComponent,
    HasAnyResourceAuthorityPipe,
    HasAuthorityPipe,
    CanViewPipe,
    CanListPipe,
    CanWritePipe,
    CanDeletePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzEmptyModule,
    TimeagoModule.forRoot()

  ],
  exports: [
    FieldValidationStateComponent,
    EmptyIndicatorComponent,
    AccessDeniedIndicatorComponent,
    FilterByPipe,
    SafeUrlPipe,
    HasAnyResourceAuthorityPipe,
    HasAuthorityPipe,
    CanViewPipe,
    CanListPipe,
    CanWritePipe,
    CanDeletePipe
  ]
})
export class SharedModule { }

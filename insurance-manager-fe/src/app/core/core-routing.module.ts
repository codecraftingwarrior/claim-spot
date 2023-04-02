import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {accidentRoutes} from './accident/accident.routes';
import {CoreLayoutComponent} from './core-layout.component';
import {EspacePersonnelComponent} from './espace-personnel/espace-personnel.component';
import {AssureGuard} from './guards/assure.guard';
import {PaymentSuccessComponent} from '../payment/payment-success/payment-success.component';
import {PaymentFailedComponent} from '../payment/payment-failed/payment-failed.component';

const routes: Routes = [
  {
    path: '',
    component: CoreLayoutComponent,
    children: [
      {path: 'espace-personnel', component: EspacePersonnelComponent, canActivate: [AssureGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}

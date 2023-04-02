import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentComponent} from './payment.component';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import {PaymentFailedComponent} from './payment-failed/payment-failed.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      { path: 'success', component: PaymentSuccessComponent },
      { path: 'failed', component: PaymentFailedComponent },
      //{ path: 'register', component: RegisterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

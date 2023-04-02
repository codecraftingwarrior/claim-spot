import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SignedInGuard } from './core/guards/signed-in.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [SignedInGuard] },
  { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [AuthGuard] },
  { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: 'enabled',
    // ...any other options you'd like to use
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

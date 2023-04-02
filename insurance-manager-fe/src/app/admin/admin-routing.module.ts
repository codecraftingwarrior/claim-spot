import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from '../pages/pages.module';
import { AdminComponent } from './admin.component';
import { categorieVehiculeRoutes } from './categorie-vehicule/categorie-vehicule.routes';
import { creneauRoutes } from './creneau/creneau.routes';
import { etatRoutes } from './etat/etat.routes';
import { formuleRoutes } from './formule/formule.routes';
import { optionRoutes } from './option/option.routes';
import { roleRoutes } from './role/role.routes';
import { UserNewComponent } from './user/user-new/user-new.component';
import { userRoutes } from './user/user.routes';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      userRoutes,
      roleRoutes,
      formuleRoutes,
      optionRoutes,
      categorieVehiculeRoutes,
      etatRoutes,
      creneauRoutes,
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

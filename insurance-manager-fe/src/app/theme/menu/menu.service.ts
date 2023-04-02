import { Injectable } from '@angular/core';
import { MenuItem } from './menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public getMenuItems(): MenuItem[] {
    return [
      new MenuItem(1, 'Acceuil', ['/home'], 'fa fa-home', false, []),
      new MenuItem(2, 'A propos', ['/about'], 'fas fa-comment-alt', false, []),
      new MenuItem(3, 'Annonces',  ['/annonce'], 'fas fa-bullhorn', false, []),
     // new MenuItem(4, 'Portfolio',  ['/portfolio'], 'bx bx-camera', false, []),
     // new MenuItem(5, 'Staff',  ['/team'], 'bx bxs-user-detail', false, []),
      new MenuItem(6, 'Administration',  ['/admin'], 'fas fa-tools', true, [
        new MenuItem(7, 'Role',  ['/admin', 'role'], 'bx bxs-group', false, [], 'role'),
        new MenuItem(8, 'Utilisateur',  ['/admin', 'user'], 'bx bxs-user-account', false, [], 'user')
      ]),
      new MenuItem(15, 'General', ['/admin'], 'bx bxs-cog', true, [
        new MenuItem(9, 'Formule',  ['/admin', 'formule'], 'bx bxs-shopping-bags', false, [], 'formule'),
        new MenuItem(10, 'Option',  ['/admin', 'option'], 'bx bx-purchase-tag', false, [], 'option'),
        new MenuItem(11, 'Categorie Vehicule',  ['/admin', 'categorie-vehicule'], 'bx bxs-car-mechanic', false, [], 'categorie-vehicule'),
        new MenuItem(12, 'Etat',  ['/admin', 'etat'], 'bx bxs-radiation', false, [], 'etat'),
        new MenuItem(12, 'Créneaux Horaires',  ['/admin', 'creneau'], 'fas fa-hourglass-half', false, [], 'creneau')
      ]),
    ]
  }
}

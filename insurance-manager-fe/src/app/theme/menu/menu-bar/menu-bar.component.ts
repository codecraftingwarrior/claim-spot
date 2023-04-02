import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuItem } from '../menu-item';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  @Input() displayMenu: boolean = true;
  menuItems: MenuItem[] = [];
  hasSubMenuItems: MenuItem[] = [];
  constructor(
    public menuSrv: MenuService, public authSrv: AuthService
  ) { }

  ngOnInit(): void {
    this.menuItems = this.menuSrv.getMenuItems().filter(mi => !mi.hasSubItems);
    this.hasSubMenuItems = this.menuSrv.getMenuItems().filter(mi => mi.hasSubItems);
  }

  hasAtLeastOneSubItemGranted(hasSubItem: MenuItem) {
    return hasSubItem
      .subItems
      .some((menuItem) => this.authSrv.hasAnyResourceAuthority(menuItem.resourceName));
  }

}

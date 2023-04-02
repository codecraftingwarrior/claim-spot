import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FooterComponent } from '../theme/footer/footer.component';
import { MenuBarComponent } from '../theme/menu/menu-bar/menu-bar.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AnnonceItemComponent } from './annonce/annonce-item/annonce-item.component';
import { SharedModule } from '../shared/shared.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonsConfig } from 'ngx-sharebuttons';
import { ShareIconsModule } from "ngx-sharebuttons/icons";

const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'],
  debug: true
}


@NgModule({
  declarations: [
    FooterComponent,
    MenuBarComponent,
    PagesComponent,
    HomeComponent,
    AboutComponent,
    AnnonceItemComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NzModalModule,
    NzSpinModule,
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    ShareButtonsModule.withConfig(customConfig),
    ShareIconsModule,
  ],
  exports: [
    FooterComponent,
    MenuBarComponent,
    AnnonceItemComponent
  ],
  providers: [TimeagoIntl]
})
export class PagesModule { }

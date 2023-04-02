import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import {PreloaderComponent} from './theme/preloader/preloader.component';
import {NotFoundComponent} from './admin/not-found/not-found.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxMaskModule} from 'ngx-mask';
import {fr_FR, NZ_I18N} from 'ng-zorro-antd/i18n';
import fr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {TimeagoIntl, TimeagoModule} from 'ngx-timeago';

registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    TimeagoModule.forRoot()
  ],
  providers: [
    {provide: 'TOKEN_PREFIX', useValue: 'Bearer'},
    { provide: 'API_URL', useValue: 'http://localhost:8080/api/' },
    { provide: 'LOGIN_URL', useValue: 'http://localhost:8080/login' },
    {provide: NZ_I18N, useValue: fr_FR},
    TimeagoIntl

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

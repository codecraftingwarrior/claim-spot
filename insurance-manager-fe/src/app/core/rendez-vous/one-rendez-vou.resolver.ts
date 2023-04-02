import { map, catchError } from 'rxjs/operators';
import { RendezVousService } from './rendez-vou.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneRendezVousResolver implements Resolve<rendezVou> {

    constructor(public rendezVouSrv: RendezVousService){}

    resolve(route: ActivatedRouteSnapshot): Observable<RendezVous> | Promise<RendezVous> | any {
        return this
            .rendezVouSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.rendezVouSrv.httpSrv.handleError(error);
                    return of({ rendezVouses: null, error: message });
                })
        ) ;
    }
}

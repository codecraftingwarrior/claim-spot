import { map, catchError } from 'rxjs/operators';
import { EtatService } from './etat.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneEtatResolver implements Resolve<etat> {

    constructor(public etatSrv: EtatService){}

    resolve(route: ActivatedRouteSnapshot): Observable<etat> | Promise<etat> | any {
        return this
            .etatSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.etatSrv.httpSrv.handleError(error);
                    return of({ etats: null, error: message });
                })
        ) ;
    }
}

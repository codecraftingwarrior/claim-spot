import { map, catchError } from 'rxjs/operators';
import { EtatService } from './etat.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Etat } from './etat';


@Injectable({ providedIn: 'root' })
export class AllEtatResolver implements Resolve<Etat[]> {

    constructor(public etatSrv: EtatService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Etat[]> | Promise<Etat[]> | Etat[] {
        return this
                .etatSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.etatSrv.httpSrv.handleError(error);
                        return of({ etats: null, error: message } as any);
            })
        );
    }
}

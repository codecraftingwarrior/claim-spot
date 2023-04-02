import { map, catchError } from 'rxjs/operators';
import { CreneauService } from './creneau.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Creneau } from './creneau';


@Injectable({ providedIn: 'root' })
export class AllCreneauResolver implements Resolve<Creneau[]> {

    constructor(public creneauSrv: CreneauService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Creneau[]> | Promise<Creneau[]> | Creneau[] {
        return this
                .creneauSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.creneauSrv.httpSrv.handleError(error);
                        return of({ creneaus: null, error: message } as any);
            })
        );
    }
}

import { map, catchError } from 'rxjs/operators';
import { CreneauService } from './creneau.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneCreneauResolver implements Resolve<creneau> {

    constructor(public creneauSrv: CreneauService){}

    resolve(route: ActivatedRouteSnapshot): Observable<creneau> | Promise<creneau> | any {
        return this
            .creneauSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.creneauSrv.httpSrv.handleError(error);
                    return of({ creneaus: null, error: message });
                })
        ) ;
    }
}

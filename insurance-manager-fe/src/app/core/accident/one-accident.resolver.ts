import { map, catchError } from 'rxjs/operators';
import { AccidentService } from './accident.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneAccidentResolver implements Resolve<accident> {

    constructor(public accidentSrv: AccidentService){}

    resolve(route: ActivatedRouteSnapshot): Observable<accident> | Promise<accident> | any {
        return this
            .accidentSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.accidentSrv.httpSrv.handleError(error);
                    return of({ accidents: null, error: message });
                })
        ) ;
    }
}

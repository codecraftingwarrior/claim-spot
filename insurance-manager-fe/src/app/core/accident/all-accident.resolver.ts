import { map, catchError } from 'rxjs/operators';
import { AccidentService } from './accident.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Accident } from './accident';


@Injectable({ providedIn: 'root' })
export class AllAccidentResolver implements Resolve<Accident[]> {

    constructor(public accidentSrv: AccidentService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Accident[]> | Promise<Accident[]> | Accident[] {
        return this
                .accidentSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.accidentSrv.httpSrv.handleError(error);
                        return of({ accidents: null, error: message } as any);
            })
        );
    }
}

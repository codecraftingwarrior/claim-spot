import { map, catchError } from 'rxjs/operators';
import { FormuleService } from './formule.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneFormuleResolver implements Resolve<formule> {

    constructor(public formuleSrv: FormuleService){}

    resolve(route: ActivatedRouteSnapshot): Observable<formule> | Promise<formule> | any {
        return this
            .formuleSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.formuleSrv.httpSrv.handleError(error);
                    return of({ formules: null, error: message });
                })
        ) ;
    }
}

import { map, catchError } from 'rxjs/operators';
import { FormuleService } from './formule.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Formule } from './formule.model';

@Injectable({ providedIn: 'root' })
export class AllFormuleResolver implements Resolve<Formule[]> {

    constructor(public formuleSrv: FormuleService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Formule[]> | Promise<Formule[]> | Formule[] {
        return this
            .formuleSrv
            .findAll()
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.formuleSrv.httpSrv.handleError(error);
                    return of({ formules: null, error: message } as any);
                })
            );
    }
}

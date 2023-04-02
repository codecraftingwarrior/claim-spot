import { map, catchError } from 'rxjs/operators';
import { RendezVousService } from './rendez-vou.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RendezVous } from './rendez-vou';


@Injectable({ providedIn: 'root' })
export class AllRendezVousResolver implements Resolve<RendezVous[]> {

    constructor(public rendezVouSrv: RendezVousService){}

    resolve(route: ActivatedRouteSnapshot): Observable<RendezVous[]> | Promise<RendezVous[]> | RendezVous[] {
        return this
                .rendezVouSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.rendezVouSrv.httpSrv.handleError(error);
                        return of({ rendezVouses: null, error: message } as any);
            })
        );
    }
}

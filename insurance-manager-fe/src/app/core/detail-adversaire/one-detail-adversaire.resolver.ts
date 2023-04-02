import { map, catchError } from 'rxjs/operators';
import { DetailAdversaireService } from './detail-adversaire.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneDetailAdversaireResolver implements Resolve<detailAdversaire> {

    constructor(public detailAdversaireSrv: DetailAdversaireService){}

    resolve(route: ActivatedRouteSnapshot): Observable<DetailAdversaire> | Promise<DetailAdversaire> | any {
        return this
            .detailAdversaireSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.detailAdversaireSrv.httpSrv.handleError(error);
                    return of({ detailAdversaires: null, error: message });
                })
        ) ;
    }
}

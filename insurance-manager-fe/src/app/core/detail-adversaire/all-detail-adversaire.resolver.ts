import { map, catchError } from 'rxjs/operators';
import { DetailAdversaireService } from './detail-adversaire.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DetailAdversaire } from './detail-adversaire';


@Injectable({ providedIn: 'root' })
export class AllDetailAdversaireResolver implements Resolve<DetailAdversaire[]> {

    constructor(public detailAdversaireSrv: DetailAdversaireService){}

    resolve(route: ActivatedRouteSnapshot): Observable<DetailAdversaire[]> | Promise<DetailAdversaire[]> | DetailAdversaire[] {
        return this
                .detailAdversaireSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.detailAdversaireSrv.httpSrv.handleError(error);
                        return of({ detailAdversaires: null, error: message } as any);
            })
        );
    }
}

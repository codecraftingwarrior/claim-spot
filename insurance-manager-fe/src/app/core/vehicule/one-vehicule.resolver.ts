import { map, catchError } from 'rxjs/operators';
import { VehiculeService } from './vehicule.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneVehiculeResolver implements Resolve<vehicule> {

    constructor(public vehiculeSrv: VehiculeService){}

    resolve(route: ActivatedRouteSnapshot): Observable<vehicule> | Promise<vehicule> | any {
        return this
            .vehiculeSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.vehiculeSrv.httpSrv.handleError(error);
                    return of({ vehicules: null, error: message });
                })
        ) ;
    }
}

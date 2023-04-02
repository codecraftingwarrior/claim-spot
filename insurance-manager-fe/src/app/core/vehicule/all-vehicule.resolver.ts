import { map, catchError } from 'rxjs/operators';
import { VehiculeService } from './vehicule.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Vehicule } from './vehicule';


@Injectable({ providedIn: 'root' })
export class AllVehiculeResolver implements Resolve<Vehicule[]> {

    constructor(public vehiculeSrv: VehiculeService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Vehicule[]> | Promise<Vehicule[]> | Vehicule[] {
        return this
                .vehiculeSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.vehiculeSrv.httpSrv.handleError(error);
                        return of({ vehicules: null, error: message } as any);
            })
        );
    }
}

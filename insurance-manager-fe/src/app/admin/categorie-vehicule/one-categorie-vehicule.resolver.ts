import { map, catchError } from 'rxjs/operators';
import { CategorieVehiculeService } from './categorie-vehicule.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneCategorieVehiculeResolver implements Resolve<categorieVehicule> {

    constructor(public categorieVehiculeSrv: CategorieVehiculeService){}

    resolve(route: ActivatedRouteSnapshot): Observable<categorieVehicule> | Promise<categorieVehicule> | any {
        return this
            .categorieVehiculeSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.categorieVehiculeSrv.httpSrv.handleError(error);
                    return of({ categorieVehicules: null, error: message });
                })
        ) ;
    }
}

import { map, catchError } from 'rxjs/operators';
import { CategorieVehiculeService } from './categorie-vehicule.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategorieVehicule } from './categorie-vehicule';


@Injectable({ providedIn: 'root' })
export class AllCategorieVehiculeResolver implements Resolve<CategorieVehicule[]> {

    constructor(public categorieVehiculeSrv: CategorieVehiculeService){}

    resolve(route: ActivatedRouteSnapshot): Observable<CategorieVehicule[]> | Promise<CategorieVehicule[]> | CategorieVehicule[] {
        return this
                .categorieVehiculeSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.categorieVehiculeSrv.httpSrv.handleError(error);
                        return of({ categorieVehicules: null, error: message } as any);
            })
        );
    }
}

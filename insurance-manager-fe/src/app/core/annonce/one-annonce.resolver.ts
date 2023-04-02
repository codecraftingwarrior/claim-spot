import { map, catchError } from 'rxjs/operators';
import { AnnonceService } from './annonce.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Annonce } from './annonce';

@Injectable({ providedIn: 'root' })
export class OneAnnonceResolver implements Resolve<Annonce> {

    constructor(public annonceSrv: AnnonceService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Annonce> | Promise<Annonce> | any {
        return this
            .annonceSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.annonceSrv.httpSrv.handleError(error);
                    return of({ annonces: null, error: message });
                })
        ) ;
    }
}

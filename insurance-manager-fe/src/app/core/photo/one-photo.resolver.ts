import { map, catchError } from 'rxjs/operators';
import { PhotoService } from './photo.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnePhotoResolver implements Resolve<photo> {

    constructor(public photoSrv: PhotoService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Photo> | Promise<Photo> | any {
        return this
            .photoSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.photoSrv.httpSrv.handleError(error);
                    return of({ photos: null, error: message });
                })
        ) ;
    }
}

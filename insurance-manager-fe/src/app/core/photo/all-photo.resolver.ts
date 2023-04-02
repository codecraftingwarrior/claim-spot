import { map, catchError } from 'rxjs/operators';
import { PhotoService } from './photo.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Photo } from './photo';


@Injectable({ providedIn: 'root' })
export class AllPhotoResolver implements Resolve<Photo[]> {

    constructor(public photoSrv: PhotoService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Photo[]> | Promise<Photo[]> | Photo[] {
        return this
                .photoSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.photoSrv.httpSrv.handleError(error);
                        return of({ photos: null, error: message } as any);
            })
        );
    }
}

import { map, catchError } from 'rxjs/operators';
import { OptionService } from './option.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OneOptionResolver implements Resolve<option> {

    constructor(public optionSrv: OptionService){}

    resolve(route: ActivatedRouteSnapshot): Observable<option> | Promise<option> | any {
        return this
            .optionSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    const message = `Message Error: ${error}`;
                    this.optionSrv.httpSrv.handleError(error);
                    return of({ options: null, error: message });
                })
        ) ;
    }
}

import { map, catchError } from 'rxjs/operators';
import { OptionService } from './option.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Option } from './option';


@Injectable({ providedIn: 'root' })
export class AllOptionResolver implements Resolve<Option[]> {

    constructor(public optionSrv: OptionService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Option[]> | Promise<Option[]> | Option[] {
        return this
                .optionSrv
                .findAll()
                .pipe(
                    map(data => data),
                    catchError(error => {
                        const message = `Message Error: ${error}`;
                        this.optionSrv.httpSrv.handleError(error);
                        return of({ options: null, error: message } as any);
            })
        );
    }
}

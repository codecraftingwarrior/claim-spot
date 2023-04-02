import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationUser } from './application-user';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AllUserResolver implements Resolve<ApplicationUser[]> {
    resolve(route: ActivatedRouteSnapshot): Observable<ApplicationUser[]> | Promise<ApplicationUser[]> | ApplicationUser[] {
        return this
            .userSrv
            .findAll()
            .pipe(
                map(data => data),
                catchError(error => {
                    console.log(error);
                    const message = `Error: ${error.error.message}`;
                    this.userSrv.httpSrv.handleError(error);
                    return of({user: null, error: message } as any) ;
                })
            );
    }

    constructor(private userSrv: UserService) { }
}
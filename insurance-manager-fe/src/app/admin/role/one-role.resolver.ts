import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Role } from './role';
import { RoleService } from './role.service';

@Injectable({ providedIn: 'root' })
export class OneRoleResolver implements Resolve<Role> {
    resolve(route: ActivatedRouteSnapshot): Observable<Role> | Promise<Role> | Role {
        return this
            .roleSrv
            .find(route.params.id)
            .pipe(
                map(data => data),
                catchError(error => {
                    console.log(error);
                    const message = `Error: ${error.error.message}`;
                    this.roleSrv.httpSrv.handleError(error);
                    return of({role: null, error: message } as any) ;
                })
            );
    }

    constructor(private roleSrv: RoleService) {}
}
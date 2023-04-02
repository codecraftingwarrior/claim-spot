import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EntityGroup } from './entity-group';
import { RoleService } from './role.service';

@Injectable({ providedIn: 'root' })
export class AllEntityGroupResolver implements Resolve<EntityGroup[]> {
    resolve(route: ActivatedRouteSnapshot): Observable<EntityGroup[]> | Promise<EntityGroup[]> | EntityGroup[] {
        return this
            .roleSrv
            .getEntityGroups()
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
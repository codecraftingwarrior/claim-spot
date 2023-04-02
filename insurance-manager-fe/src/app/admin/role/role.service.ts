import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base-service.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { EntityGroup } from './entity-group';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role>{

  constructor(public httpSrv: HttpService<Role>, public toastr: ToastrService) {
    super(httpSrv, toastr);
    this.path = 'role/';
    this.resourceName = 'role';
  }

  getEntityGroups() {
    return this.httpSrv.get<EntityGroup[]>(this.path + 'entity-groups');
  }

  managePermissions(role: Role, entityGroups: EntityGroup[]) {
    return this.httpSrv.post<Role>(this.path + 'manage-permission/' + role.id, entityGroups)
  }

  findWithPermission(role: Role): Observable<{ role: Role, entityGroups: EntityGroup[] }> {
    return this.httpSrv.get<{ role: Role, entityGroups: EntityGroup[] }>(this.path + role.id + '/');
  }
}

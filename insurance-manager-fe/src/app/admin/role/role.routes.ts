import { Route } from "@angular/router";
import { AllRoleResolver } from './all-role.resolver';
import { OneRoleResolver } from './one-role.resolver';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleNewComponent } from './role-new/role-new.component';

export const roleRoutes: Route = {
    path: 'role',
    children: [
        {
            path: '',
            component: RoleListComponent,
            resolve: { roles: AllRoleResolver }
        },
        {
            path: ':id/detail',
            component: RoleDetailComponent,
            resolve: { role: OneRoleResolver }
        },
        {
            path: 'new',
            component: RoleNewComponent,
        }
    ]
}
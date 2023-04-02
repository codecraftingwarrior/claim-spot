import { Route } from '@angular/router';
import { AllUserResolver } from './all-user.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';

const userRoutes: Route = {
    path: 'user', children: [
        {
            path: '',
            component: UserListComponent,
            resolve: {
                users: AllUserResolver,
            }
        },
    ]

};

export { userRoutes };
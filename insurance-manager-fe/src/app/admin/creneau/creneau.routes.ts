import { Route } from '@angular/router';
import { AllCreneauResolver } from './all-creneau.resolver';
import { CreneauListComponent } from './creneau-list/creneau-list.component';

const creneauRoutes: Route = {
    path: 'creneau', children: [
        {
            path: '',
            component: CreneauListComponent,
            resolve: {
                creneaux: AllCreneauResolver,
            }
        },
    ]

};

export { creneauRoutes };
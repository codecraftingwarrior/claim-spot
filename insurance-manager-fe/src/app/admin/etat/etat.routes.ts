import { Route } from '@angular/router';
import { AllEtatResolver } from './all-etat.resolver';
import { EtatListComponent } from './etat-list/etat-list.component';

const etatRoutes: Route = {
    path: 'etat', children: [
        {
            path: '',
            component: EtatListComponent,
            resolve: {
                etats: AllEtatResolver,
            }
        },
    ]

};

export { etatRoutes };
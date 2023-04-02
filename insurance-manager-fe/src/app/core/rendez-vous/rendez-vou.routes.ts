import { Route } from '@angular/router';
import { AllRendezVousResolver } from './all-rendez-vou.resolver';
import { RendezVousListComponent } from './rendez-vou-list/rendez-vou-list.component';

const rendezVouRoutes: Route = {
    path: 'rendez-vou', children: [
        {
            path: '',
            component: RendezVousListComponent,
            resolve: {
                rendezVouses: AllRendezVousResolver,
            }
        },
    ]

};

export { rendezVouRoutes };
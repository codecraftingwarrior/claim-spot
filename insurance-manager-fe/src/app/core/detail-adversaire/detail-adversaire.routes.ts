import { Route } from '@angular/router';
import { AllDetailAdversaireResolver } from './all-detail-adversaire.resolver';
import { DetailAdversaireListComponent } from './detail-adversaire-list/detail-adversaire-list.component';

const detailAdversaireRoutes: Route = {
    path: 'detail-adversaire', children: [
        {
            path: '',
            component: DetailAdversaireListComponent,
            resolve: {
                detailAdversaires: AllDetailAdversaireResolver,
            }
        },
    ]

};

export { detailAdversaireRoutes };
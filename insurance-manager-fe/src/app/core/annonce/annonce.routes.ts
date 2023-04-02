import { Route } from '@angular/router';
import { AllAnnonceResolver } from './all-annonce.resolver';
import { AnnonceListComponent } from './annonce-list/annonce-list.component';

const annonceRoutes: Route = {
    path: 'annonce', children: [
        {
            path: '',
            component: AnnonceListComponent,
            resolve: {
                annonces: AllAnnonceResolver,
            }
        },
    ]

};

export { annonceRoutes };
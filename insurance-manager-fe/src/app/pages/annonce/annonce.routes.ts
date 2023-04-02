import { Route } from '@angular/router';
import { AllAnnonceResolver } from 'src/app/core/annonce/all-annonce.resolver';
import { AnnonceListComponent } from 'src/app/core/annonce/annonce-list/annonce-list.component';


const annonceRoutes: Route = {
    path: 'annonce', children: [
        { path: '', component: AnnonceListComponent, resolve: { annonces: AllAnnonceResolver } },
    ]

};

export { annonceRoutes };
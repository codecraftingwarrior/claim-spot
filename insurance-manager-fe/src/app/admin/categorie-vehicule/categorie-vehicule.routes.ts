import { Route } from '@angular/router';
import { AllCategorieVehiculeResolver } from './all-categorie-vehicule.resolver';
import { CategorieVehiculeListComponent } from './categorie-vehicule-list/categorie-vehicule-list.component';

const categorieVehiculeRoutes: Route = {
    path: 'categorie-vehicule', children: [
        {
            path: '',
            component: CategorieVehiculeListComponent,
            resolve: {
                categorieVehicules: AllCategorieVehiculeResolver,
            }
        },
    ]

};

export { categorieVehiculeRoutes };
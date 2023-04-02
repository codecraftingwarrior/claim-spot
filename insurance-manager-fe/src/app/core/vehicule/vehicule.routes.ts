import { Route } from '@angular/router';
import { AllVehiculeResolver } from './all-vehicule.resolver';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';

const vehiculeRoutes: Route = {
    path: 'vehicule', children: [
        {
            path: '',
            component: VehiculeListComponent,
            resolve: {
                vehicules: AllVehiculeResolver,
            }
        },
    ]

};

export { vehiculeRoutes };
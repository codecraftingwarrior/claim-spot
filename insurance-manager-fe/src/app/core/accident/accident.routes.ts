import { Route } from '@angular/router';
import { AllAccidentResolver } from './all-accident.resolver';
import { AccidentListComponent } from './accident-list/accident-list.component';

const accidentRoutes: Route = {
    path: 'accident', children: [
        {
            path: '',
            component: AccidentListComponent,
            resolve: {
                accidents: AllAccidentResolver,
            }
        },
    ]

};

export { accidentRoutes };
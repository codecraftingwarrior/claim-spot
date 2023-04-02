import { Route } from '@angular/router';
import { AllFormuleResolver } from './all-formule.resolver';
import { FormuleListComponent } from './formule-list/formule-list.component';

const formuleRoutes: Route = {
    path: 'formule', children: [
        {
            path: '',
            component: FormuleListComponent,
            resolve: {
                formules: AllFormuleResolver,
            }
        },
    ]

};

export { formuleRoutes };
import { Route } from '@angular/router';
import { AllOptionResolver } from './all-option.resolver';
import { OptionListComponent } from './option-list/option-list.component';

const optionRoutes: Route = {
    path: 'option', children: [
        {
            path: '',
            component: OptionListComponent,
            resolve: {
                options: AllOptionResolver,
            }
        },
    ]

};

export { optionRoutes };
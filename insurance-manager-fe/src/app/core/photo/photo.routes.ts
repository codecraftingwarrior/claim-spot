import { Route } from '@angular/router';
import { AllPhotoResolver } from './all-photo.resolver';
import { PhotoListComponent } from './photo-list/photo-list.component';

const photoRoutes: Route = {
    path: 'photo', children: [
        {
            path: '',
            component: PhotoListComponent,
            resolve: {
                photos: AllPhotoResolver,
            }
        },
    ]

};

export { photoRoutes };
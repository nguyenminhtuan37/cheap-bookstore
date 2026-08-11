import {Routes} from '@angular/router';
import {Category} from '../modules/Category';
import {Product} from '../modules/products';
import {App} from '../app'

export const routeConfig: Routes = [
    {
        path: '',
        component: App,
    },
    {
        path: 'category',
        component: Category,
    },
    {
        path: 'product',
        component: Product,
    },
    {
        path: '**',
        redirectTo: '',
    }
];

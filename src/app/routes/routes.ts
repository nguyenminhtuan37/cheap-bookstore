import {Routes} from '@angular/router';
import {Category} from '../model/Category';
import {Product} from '../model/products';
import {App} from '../app'

export const routes: Routes = [
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
];
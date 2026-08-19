import {Routes} from '@angular/router';
import {Category} from '../modules/Category';
import {Product} from '../modules/products';
import {Home} from '../modules/home'

export const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'homepage',
    },
    {
        path: 'category',
        component: Category,
        title: "Category"
    },
    {
        path: 'product',
        component: Product,
        title: "Product"
    },
    {
        path: '**',
        redirectTo: '',
    }
];

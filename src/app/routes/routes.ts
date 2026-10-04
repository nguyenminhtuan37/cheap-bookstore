import {Routes} from '@angular/router';
import {Category} from '../components/Category';
import {Product} from '../components/products';
import {Home} from '../components/home'

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
        title: "Product",
    },
    {
        path: '**',
        redirectTo: '',
    }
];

import {Routes} from '@angular/router';
import { Category } from './features/components/categorys/category.component';
// import { Product } from './features/components/products/product-list.component';
import {Home} from './features/components/home/home';

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
    // {
    //     path: 'product',
    //     component: Product,
    //     title: "Product",
    // },
    {
        path: '**',
        redirectTo: '',
    }
];

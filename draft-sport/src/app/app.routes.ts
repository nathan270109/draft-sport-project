import { Routes } from '@angular/router';
import { Home } from './feats/home/home';
import { Cart } from './feats/cart/cart';

export const routes: Routes = [

    {path: '/home', component: Home},
    {path: '/cart', component: Cart},
    {path: '', redirectTo: 'home', pathMatch: 'full'}

];

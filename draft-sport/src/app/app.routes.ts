import { Routes } from '@angular/router';
import { Home } from './feats/home/home';
import { Cart } from './feats/cart/cart';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home},
    { path: 'cart', component: Cart}

];

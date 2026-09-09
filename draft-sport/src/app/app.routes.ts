import { Routes } from '@angular/router';
import { Home } from './feats/home/home';
import { Cart } from './feats/cart/cart';
import { Produtos } from './feats/produtos/produtos';
import { ProdutoDetalhe } from './feats/produto-detalhe/produto-detalhe';


export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home},
    { path: 'produtos', component: Produtos },
    { path: 'produtos/:id', component: ProdutoDetalhe },
    { path: 'cart', component: Cart}

];

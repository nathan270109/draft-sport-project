import { Routes } from '@angular/router';
import { Home } from './feats/home/home';
import { Cart } from './feats/cart/cart';
import { Produtos } from './feats/produtos/produtos';
import { ProdutoDetalhe } from './feats/produto-detalhe/produto-detalhe';
import { AdminProdutos } from './feats/admin-produtos/admin-produtos';
import { CompraRealizada } from './feats/compra-realizada/compra-realizada';
import { Admin } from './feats/produtos-api/admin/admin';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home},
    { path: 'produtos', component: Produtos },
    { path: 'produtos/:id', component: ProdutoDetalhe },
    { path: 'cart', component: Cart},
    { path: 'admin/produtos', component: AdminProdutos },
    { path: 'compra-realizada', component: CompraRealizada },
    { path: 'admin', component: Admin },

];

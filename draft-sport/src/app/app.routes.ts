import { Routes } from '@angular/router';
import { Home } from './feats/home/home';
import { Produtos } from './feats/produtos/produtos';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
    title: 'DraftSport',
  },
  {
    path: 'produtos',
    component: Produtos,
    title: 'Produtos | DraftSport',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

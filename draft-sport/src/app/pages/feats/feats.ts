import { Component } from '@angular/core';
import { Home } from "./home/home";
import { Catalog } from "./catalog/catalog";
import { Cart } from "./cart/cart";

@Component({
import { Home } from "./home/home";
  imports: [Home, Catalog, Cart],
  selector: 'app-feats',
  imports: [Cart, Catalog, Home]
  templateUrl: './feats.html',
})
export class Feats {}

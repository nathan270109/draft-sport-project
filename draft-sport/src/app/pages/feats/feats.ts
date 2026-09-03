import { Component } from '@angular/core';
import { Cart } from "./cart/cart";
import { Catalog } from "./catalog/catalog";

@Component({
  imports: [Cart, Catalog],
  selector: 'app-feats',
  styleUrl: './feats.css',
  templateUrl: './feats.html',
})
export class Feats {}

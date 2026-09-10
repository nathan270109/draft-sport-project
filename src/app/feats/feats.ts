import { Component } from '@angular/core';
import { Cart } from "./cart/cart";
import { Home } from "./home/home";
import { Produtos } from "./produtos/produtos";

@Component({
  imports: [Cart, Home, Produtos],
  selector: 'app-feats',
  styleUrl: './feats.css',
  templateUrl: './feats.html',
})
export class Feats {}

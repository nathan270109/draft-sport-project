import { Component } from '@angular/core';
import { Home } from "./home/home";
import { Cart } from "./cart/cart";

@Component({
  imports: [Home, Cart],
  selector: 'app-feats',
  styleUrl: './feats.css',
  templateUrl: './feats.html',
})
export class Feats {}

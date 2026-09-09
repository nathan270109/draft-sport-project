import { Component } from '@angular/core';
import { Carrossel } from "./carrossel/carrossel";
import { Hero } from "./hero/hero";

@Component({
  imports: [Carrossel, Hero],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

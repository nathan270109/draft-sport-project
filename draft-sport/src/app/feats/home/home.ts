import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { Carrossel } from "./carrossel/carrossel";


@Component({
  imports: [Hero, Carrossel],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

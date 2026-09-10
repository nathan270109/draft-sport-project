import { Component } from '@angular/core';
import { Carrossel } from "./carrossel/carrossel";
import { Hero } from "./hero/hero";
import { Informacoes } from "./informacoes/informacoes";

@Component({
  imports: [Carrossel, Hero, Informacoes],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

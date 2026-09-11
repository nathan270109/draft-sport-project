import { Component } from '@angular/core';
import { Carrossel } from "./carrossel/carrossel";
import { Hero } from "./hero/hero";
import { Informacoes } from "./informacoes/informacoes";
import { MarcasParceiras } from "./marcas-parceiras/marcas-parceiras";

@Component({
  imports: [Carrossel, Hero, Informacoes, MarcasParceiras],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

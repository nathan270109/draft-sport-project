import { Component } from '@angular/core';
import { Carrossel } from "./carrossel/carrossel";
import { Hero } from "./hero/hero";
import { Footer } from "../../components/footer/footer";
import { Informacoes } from "./informacoes/informacoes";

@Component({
  imports: [Carrossel, Hero, Footer, Informacoes],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

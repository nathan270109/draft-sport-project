import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Carrossel } from './carrossel/carrossel';
import { Header } from '../../components/header/header';



@Component({
  imports: [Hero,Carrossel, Header],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

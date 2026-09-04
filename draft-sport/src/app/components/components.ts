import { Component } from '@angular/core';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

@Component({
  imports: [Footer, Header],
  selector: 'app-components',
  styleUrl: './components.css',
  templateUrl: './components.html',
})
export class Components {}

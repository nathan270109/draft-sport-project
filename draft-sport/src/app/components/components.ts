import { Component } from '@angular/core';
import { Header } from "./header/header";

@Component({
  imports: [Header],
  selector: 'app-components',
  styleUrl: './components.css',
  templateUrl: './components.html',
})
export class Components {}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./feats/home/home";
import { Header } from "./components/header/header";

@Component({
  imports: [RouterOutlet, Home, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('draft-sport');
}

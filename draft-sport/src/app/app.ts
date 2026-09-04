import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./feats/home/home";
import { Footer } from "./components/footer/footer";

@Component({
  imports: [RouterOutlet, Home, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('draft-sport');
}

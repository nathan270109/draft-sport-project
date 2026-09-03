import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Feats } from "./feats/feats";
import { Home } from "./feats/home/home";

@Component({
  imports: [RouterOutlet, Feats, Home],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('draft-sport');
}

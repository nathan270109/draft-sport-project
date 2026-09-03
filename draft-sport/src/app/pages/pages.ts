import { Component } from '@angular/core';
import { Feats } from "./feats/feats";

@Component({
  imports: [Feats],
  selector: 'app-pages',
  styleUrl: './pages.css',
  templateUrl: './pages.html',
})
export class Pages {}

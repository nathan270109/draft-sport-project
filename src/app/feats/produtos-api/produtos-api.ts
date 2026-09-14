import { Component } from '@angular/core';
import { Admin } from "./admin/admin";

@Component({
  imports: [Admin],
  selector: 'app-produtos-api',
  styleUrl: './produtos-api.css',
  templateUrl: './produtos-api.html',
})
export class ProdutosApi {}

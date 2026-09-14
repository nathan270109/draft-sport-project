import { Component } from '@angular/core';
import { CadastroProduto } from './cadastro-produto/cadastro-produto';

@Component({
  imports: [CadastroProduto],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {}

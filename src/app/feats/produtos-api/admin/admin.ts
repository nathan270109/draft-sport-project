import { Component } from '@angular/core';
import { CadastroProduto } from './cadastro-produto/cadastro-produto';
import { AtualizaProduto } from './atualiza-produto/atualiza-produto';

@Component({
  imports: [CadastroProduto, AtualizaProduto],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {}

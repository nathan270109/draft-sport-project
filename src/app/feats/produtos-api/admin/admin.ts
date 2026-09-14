import { Component } from '@angular/core';
import { CadastroProduto } from './cadastro-produto/cadastro-produto';
import { AtualizaProduto } from './atualiza-produto/atualiza-produto';
import { DeletaProduto } from './deleta-produto/deleta-produto';

@Component({
  imports: [CadastroProduto, AtualizaProduto, DeletaProduto],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {}

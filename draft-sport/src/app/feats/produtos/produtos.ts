import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InterfaceProdutosTs as Produto } from './interface-produtos';
import { ProdutosMockService } from './produtos.service';


@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-produtos',
  styleUrl: './produtos.css',
  templateUrl: './produtos.html',
})
export class Produtos {
  termoBusca = '';

  constructor(private produtosService: ProdutosMockService) {}
    get produtosFiltrados(): Produto [] {
      return this.produtosService.pesquisar(this.termoBusca)
    }

    onImageError(event: Event): void{
      const imagem = event.target as HTMLImageElement;
      if (imagem.dataset['fallback']) {
        return;
      }

      imagem.dataset['fallback'] = 'true';
      imagem.src = '/produtos/tenis-adizero-mock.png';
    }
  
}

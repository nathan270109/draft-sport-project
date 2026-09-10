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
  // Está ligado ao campo de pesquisa por meio do [(ngModel)] no HTML.
  termoBusca = '';

  // A injeção de dependência entrega a única fonte dos dados mockados ao componente.
  constructor(private produtosService: ProdutosMockService) {}

  // Getter: a cada atualização do template, devolve os produtos compatíveis com a busca.
  get produtosFiltrados(): Produto[] {
    return this.produtosService.pesquisar(this.termoBusca);
  }

  // Caso uma imagem não carregue, troca-a uma vez por uma imagem local de segurança.
  onImageError(event: Event): void {
    const imagem = event.target as HTMLImageElement;
    if (imagem.dataset['fallback']) {
      return;
    }

    imagem.dataset['fallback'] = 'true';
    imagem.src = '/produtos/tenis-adizero-mock.png';
  }
}

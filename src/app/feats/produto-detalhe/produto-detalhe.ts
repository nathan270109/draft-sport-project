import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../cart/cart-service';
import { InterfaceProdutosTs as Produto } from '../produtos/interface-produtos';
import { ProdutosMockService } from '../produtos/produtos.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.css',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe {
  // produto pode ficar undefined quando a URL contém um id inexistente.
  produto?: Produto;
  // Lista derivada do mesmo catálogo, sem repetir o item aberto.
  relacionados: Produto[] = [];
  // Estados locais: ainda não são enviados nem persistidos no carrinho.
  quantidade = 1;
  tamanhoSelecionado?: string;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosMockService,
    private cartService: CartService,
    private router: Router,
  ) {
    // paramMap emite novamente se o usuário abrir outro produto sem recarregar a página.
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      // Busca o item da URL e só exibe recomendações quando ele existe.
      this.produto = this.produtosService.buscarPorId(id);
      this.relacionados = this.produto
        ? this.produtosService.relacionados(id)
        : [];

      // Ao trocar de produto, a escolha anterior não deve permanecer selecionada.
      this.quantidade = 1;
      this.tamanhoSelecionado = undefined;
    });
  }

  aumentarQuantidade(): void {
    this.quantidade++;
  }

  diminuirQuantidade(): void {
    // Esta condição garante a regra de negócio: o mínimo é uma unidade.
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  selecionarTamanho(tamanho: string): void {
    // O HTML usa este valor para aplicar a classe visual "selecionado".
    this.tamanhoSelecionado = tamanho;
  }

  adicionarAoCarrinho(): void {
    // Não permite criar um item de carrinho sem produto ou tamanho definido.
    if (!this.produto || !this.tamanhoSelecionado) {
      return;
    }

    // Converte o modelo de catálogo para o formato que o domínio Carrinho espera.
    this.cartService.adicionarProduto({
      id: this.produto.id,
      nome: this.produto.nome,
      descricao: this.produto.descricao,
      preco: this.produto.preco,
      imagem: this.produto.imagem,
      tamanho: this.tamanhoSelecionado,
      quantidade: this.quantidade,
    });

    // Após adicionar, leva o usuário à página que mostra o item incluído.
    this.router.navigate(['/cart']);
  }

  onImageError(event: Event): void {
    const imagem = event.target as HTMLImageElement;

    // Evita que uma falha da própria imagem alternativa gere um ciclo infinito.
    if (imagem.dataset['fallback']) {
      return;
    }

    imagem.dataset['fallback'] = 'true';
    imagem.src = '/produtos/tenis-adizero-mock.png';
  }
}

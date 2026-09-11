import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../cart/cart-service';
import { InterfaceProdutosTs as Produto } from '../produtos/interface-produtos';
import { ProdutosApiService } from '../produtos/produtos-api.service';

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
  carregando = true;
  // Estados locais: ainda não são enviados nem persistidos no carrinho.
  quantidade = 1;
  tamanhoSelecionado?: string;

  constructor(
    private route: ActivatedRoute,
    private produtosApi: ProdutosApiService,
    private cartService: CartService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
    // paramMap emite novamente se o usuário abrir outro produto sem recarregar a página.
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      // Ao trocar de produto, a escolha anterior não deve permanecer selecionada.
      this.quantidade = 1;
      this.tamanhoSelecionado = undefined;
      this.carregando = true;

      // O produto e as recomendações passam a ser obtidos da API real.
      this.produtosApi.buscarParaLoja(id).subscribe({
        next: (produto) => {
          this.produto = produto;
          this.carregando = false;
          this.carregarRelacionados(id);
          this.changeDetector.markForCheck();
        },
        error: () => {
          this.produto = undefined;
          this.relacionados = [];
          this.carregando = false;
          this.changeDetector.markForCheck();
        },
      });
    });
  }

  private carregarRelacionados(idAtual: number): void {
    this.produtosApi.listarParaLoja().subscribe({
      next: (produtos) => {
        this.relacionados = produtos
          .filter((produto) => produto.id !== idAtual)
          .slice(0, 4);
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.relacionados = [];
        this.changeDetector.markForCheck();
      },
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
    imagem.src = this.criarImagemAlternativa(imagem.alt);
  }

  private criarImagemAlternativa(nomeProduto: string): string {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <rect width="600" height="600" fill="#efeeeb" />
        <circle cx="300" cy="240" r="90" fill="#d9d6d0" />
        <path d="M215 270h170" stroke="#555" stroke-width="14" stroke-linecap="round" />
        <text x="300" y="420" text-anchor="middle" fill="#222" font-family="Arial, sans-serif" font-size="26" font-weight="700">${nomeProduto}</text>
      </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}

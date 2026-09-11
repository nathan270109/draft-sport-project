import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InterfaceProdutosTs as Produto } from './interface-produtos';
import { ProdutosApiService } from './produtos-api.service';


@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-produtos',
  styleUrl: './produtos.css',
  templateUrl: './produtos.html',
})
export class Produtos implements OnInit {
  // Está ligado ao campo de pesquisa por meio do [(ngModel)] no HTML.
  termoBusca = '';
  produtos: Produto[] = [];
  carregando = false;
  mensagemErro = '';

  constructor(
    private produtosApi: ProdutosApiService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.mensagemErro = '';

    this.produtosApi.listarParaLoja().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.carregando = false;
        // Garante que a grade seja atualizada assim que a API responder.
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar os produtos da API.';
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  // A busca acontece sobre a lista recebida da API, sem criar uma segunda requisição.
  get produtosFiltrados(): Produto[] {
    const busca = this.termoBusca.trim().toLowerCase();

    return busca
      ? this.produtos.filter((produto) =>
          produto.nome.toLowerCase().includes(busca),
        )
      : this.produtos;
  }

  // Caso uma imagem não carregue, mostra um fallback identificado com o produto correto.
  onImageError(event: Event): void {
    const imagem = event.target as HTMLImageElement;
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

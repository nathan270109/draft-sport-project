import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InterfaceProdutosTs as Produto } from '../produtos/interface-produtos';
import { ProdutosMockService } from '../produtos/produtos.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.css',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe {
  produto?: Produto;
  relacionados: Produto[] = [];
  quantidade = 1;
  tamanhoSelecionado?: string;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosMockService,
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.produto = this.produtosService.buscarPorId(id);
      this.relacionados = this.produto
        ? this.produtosService.relacionados(id)
        : [];

      this.quantidade = 1;
      this.tamanhoSelecionado = undefined;
    });
  }

  aumentarQuantidade(): void {
    this.quantidade++;
  }

  diminuirQuantidade(): void {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  selecionarTamanho(tamanho: string): void {
    this.tamanhoSelecionado = tamanho;
  }
}
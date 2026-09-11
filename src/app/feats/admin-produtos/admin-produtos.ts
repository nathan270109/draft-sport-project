import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ProdutoListResponseApi,
  ProdutoRequestApi,
  ProdutoResponseApi,
} from '../produtos/produto-api';
import { ProdutosApiService } from '../produtos/produtos-api.service';

type FormularioProduto = ProdutoRequestApi;

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin-produtos',
  styleUrl: './admin-produtos.css',
  templateUrl: './admin-produtos.html',
})
export class AdminProdutos implements OnInit {
  /** Quantidade inicial para a lista não ficar longa ao abrir a página. */
  readonly limiteInicialDaLista = 5;
  produtos: ProdutoListResponseApi[] = [];
  produtoEmEdicao?: ProdutoResponseApi;
  carregando = false;
  salvando = false;
  mostrandoTodos = false;
  mensagemErro = '';

  formulario: FormularioProduto = this.criarFormularioVazio();

  constructor(
    private produtosApi: ProdutosApiService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  /**
   * Entrega ao HTML somente os cinco primeiros produtos até que a pessoa
   * escolha visualizar a lista inteira. Os produtos continuam todos em
   * memória: clicar em "Ver mais" não faz outra chamada à API.
   */
  get produtosVisiveis(): ProdutoListResponseApi[] {
    return this.mostrandoTodos
      ? this.produtos
      : this.produtos.slice(0, this.limiteInicialDaLista);
  }

  get existemMaisProdutos(): boolean {
    return this.produtos.length > this.limiteInicialDaLista;
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.mensagemErro = '';
    this.mostrandoTodos = false;

    this.produtosApi.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.carregando = false;
        // Atualiza a lista imediatamente quando a API devolve os produtos.
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar os produtos da API.';
        this.carregando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  verMaisProdutos(): void {
    this.mostrandoTodos = true;
  }

  verMenosProdutos(): void {
    this.mostrandoTodos = false;
  }

  iniciarCriacao(): void {
    this.produtoEmEdicao = undefined;
    this.formulario = this.criarFormularioVazio();
    this.mensagemErro = '';
  }

  editar(produto: ProdutoListResponseApi): void {
    this.mensagemErro = '';

    // A listagem não traz descrição; por isso o detalhe é consultado antes de editar.
    this.produtosApi.buscarPorId(produto.id).subscribe({
      next: (produtoCompleto) => {
        this.produtoEmEdicao = produtoCompleto;
        this.formulario = {
          nome: produtoCompleto.nome,
          descricao: produtoCompleto.descricao,
          preco: produtoCompleto.preco,
          urlImagem: produtoCompleto.urlImagem,
        };
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar o produto para edição.';
        this.changeDetector.markForCheck();
      },
    });
  }

  salvar(formulario: NgForm): void {
    if (formulario.invalid) {
      return;
    }

    this.salvando = true;
    this.mensagemErro = '';

    const requisicao = this.produtoEmEdicao
      ? this.produtosApi.atualizar(this.produtoEmEdicao.id, this.formulario)
      : this.produtosApi.criar(this.formulario);

    requisicao.subscribe({
      next: () => {
        this.salvando = false;
        this.iniciarCriacao();
        formulario.resetForm(this.formulario);
        this.carregarProdutos();
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.mensagemErro = 'Não foi possível salvar o produto.';
        this.salvando = false;
        this.changeDetector.markForCheck();
      },
    });
  }

  excluir(produto: ProdutoListResponseApi): void {
    const confirmou = globalThis.confirm(`Excluir “${produto.nome}”?`);

    if (!confirmou) {
      return;
    }

    this.mensagemErro = '';
    this.produtosApi.excluir(produto.id).subscribe({
      next: () => this.carregarProdutos(),
      error: () => {
        this.mensagemErro = 'Não foi possível excluir o produto.';
        this.changeDetector.markForCheck();
      },
    });
  }

  private criarFormularioVazio(): FormularioProduto {
    return {
      nome: '',
      descricao: '',
      preco: 0,
      urlImagem: '',
    };
  }
}

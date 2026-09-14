import { Component, inject, signal } from '@angular/core';
import { ServiceApi } from '../../service-api';
import { Produto } from './produto';
import { form, required, FormField, minLength, maxLength, min } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-cadastro-produto',
  styleUrl: './cadastro-produto.css',
  templateUrl: './cadastro-produto.html',
})
export class CadastroProduto {

  protected readonly serviceApi = inject(ServiceApi);

  protected produtoModel = signal<Produto>({
    nome: '',
    descricao: '',
    preco: null,
    urlImagem: ''
  });

  produtos = signal<Produto[]>([]);

  protected produtoForm = form(this.produtoModel, (p) => {

    // Nome do Produto
    required(p.nome, { message: 'Nome é obrigatório' });
    minLength(p.nome, 3, { message: 'Nome deve ter no mínimo 3 caracteres' });
    maxLength(p.nome, 50, { message: 'Nome deve ter no máximo 50 caracteres' });

    // Descrção do Produto
    required(p.descricao, { message: 'Descrição é obrigatória' });
    minLength(p.descricao, 5, { message: 'Descrição deve ter no mínimo 5 caracteres' });
    maxLength(p.descricao, 200, { message: 'Descrição deve ter no máximo 200 caracteres' });

    // Preço do Produto
    required(p.preco, { message: 'Preço é obrigatório' });
    min(p.preco, 0, { message: 'Preço deve ser um valor positivo' });

    // Url da Imagem
    required(p.urlImagem, { message: 'Url da Imagem é obrigatória' });

  });

  protected cadastroProduto(event: SubmitEvent) {
    event.preventDefault();

    const produto = this.produtoModel();

    // Requisição do nome do produto
    if (produto.nome.length < 3) {
      return;
    }

    if (produto.nome.length > 50) {
      return;
    }

    // Requisição da descrição do produto
    if (produto.descricao.length < 5) {
      return;
    }
    
    if (produto.descricao.length > 200) {
      return;
    }

    // Requisição do preço do produto
    if (produto.preco === null || produto.preco < 0) {
      return;
    }

    this.serviceApi.cadastrarProduto(produto).subscribe({
      next: (response) => {
        alert ('Produto cadastrado com ID:' + response.id);

        this.produtoModel.set({
          nome: '',
          descricao: '',
          preco: null,
          urlImagem: ''
        });

        this.produtoForm().reset();
      },
      error: () => {
        alert ('Algo deu errado!');
      }
    });

    this.produtos.update(valor => [...valor, produto]);
  };
}

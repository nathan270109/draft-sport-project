import { Component, inject, signal } from '@angular/core';
import { ServiceApi } from '../../service-api';
import { InterfcePut } from './interfce-put';
import { form, required, FormField, minLength, maxLength, min } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-atualiza-produto',
  styleUrl: './atualiza-produto.css',
  templateUrl: './atualiza-produto.html',
})
export class AtualizaProduto {

  protected readonly serviceApi = inject(ServiceApi);

  protected putModel = signal<InterfcePut>({
    id: null,
    nome: '',
    descricao: '',
    preco: null,
    urlImagem: ''
  });

  protected puts = signal<InterfcePut[]>([]);

  protected putForm = form(this.putModel, (p) => {

    // ID do Produto
    required(p.id, { message: 'ID é obrigatório' });
    min(p.id, 1, { message: 'ID deve ser um valor positivo' });

    // Nome do Produto
    required(p.nome, { message: 'Nome é obrigatório' });
    minLength(p.nome, 3, { message: 'Nome deve ter no mínimo 3 caracteres' });
    maxLength(p.nome, 50, { message: 'Nome deve ter no máximo 50 caracteres' });

    // Descrição do Produto
    required(p.descricao, { message: 'Descrição é obrigatória' });
    minLength(p.descricao, 5, { message: 'Descrição deve ter no mínimo 5 caracteres' });
    maxLength(p.descricao, 200, { message: 'Descrição deve ter no máximo 200 caracteres' });

    // Preço do Produto
    required(p.preco, { message: 'Preço é obrigatório' });
    min(p.preco, 0, { message: 'Preço deve ser um valor positivo' });

    // Url da Imagem
    required(p.urlImagem, { message: 'Url da Imagem é obrigatória' });

  });

  protected atualizarProduto(event: SubmitEvent) {
    event.preventDefault();

    const put = this.putModel();

    // Requisição do ID do produto
    if (put.id === null || put.id < 1) {
      return;
    }

    // Requisição do nome do produto
    if (put.nome.length < 3) {
      return;
    }

    if (put.nome.length > 50) {
      return;
    }

    // Requisição da descrição do produto
    if (put.descricao.length < 5) {
      return;
    }

    if (put.descricao.length > 200) {
      return;
    }

    // Requisição do preço do produto
    if (put.preco === null || put.preco < 0) {
      return;
    }

     this.serviceApi.atualizarProduto(this.putModel()).subscribe({

      next: (response) => {
        alert ('Produto do ID ' + response.id + ' foi atualizado com sucesso!');

        this.putModel.set({
          id: null,
          nome: '',
          descricao: '',
          preco: null,
          urlImagem: ''
        });

        this.putForm().reset();
      },
      error: () => {
        alert ('Algo deu errado!');
      }
    });

    this.puts.update(valor => [...valor, put]);
  };
}

import { Component, inject, signal } from '@angular/core';
import { ServiceApi } from '../../service-api';
import { InterfcePut } from './interfce-put';
import { form, required, FormField } from '@angular/forms/signals';

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
    
    // Nome do Produto
    required(p.nome, { message: 'Nome é obrigatório' });

    // Descrição do Produto
    required(p.descricao, { message: 'Descrição é obrigatória' });

    // Preço do Produto
    required(p.preco, { message: 'Preço é obrigatório' });

    // Url da Imagem
    required(p.urlImagem, { message: 'Url da Imagem é obrigatória' });

  });

  protected atualizarProduto(event: SubmitEvent) {
    event.preventDefault();

    const put = this.putModel();

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

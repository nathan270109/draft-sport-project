import { Component, inject, signal } from '@angular/core';
import { ServiceApi } from '../../service-api';
import { InterfaceDelete } from './interface-delete';
import { form, required, FormField, min } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-deleta-produto',
  styleUrl: './deleta-produto.css',
  templateUrl: './deleta-produto.html',
})
export class DeletaProduto {

  protected readonly serviceApi = inject(ServiceApi);

  protected deleteModel = signal<InterfaceDelete>({
    id: null
  });

  protected deletar = signal<InterfaceDelete[]>([]);

  protected deleteForm = form(this.deleteModel, (p) => {

    // ID do Produto
    required(p.id, { message: 'ID é obrigatório' });
    min(p.id, 1, { message: 'ID deve ser um valor positivo' });

  });

  protected deletarProduto(event: SubmitEvent) {
    event.preventDefault();

    const excluir = this.deleteModel();

    // Requisição do ID do produto
    if (excluir.id === null || excluir.id < 1) {
      return;
    }

    this.serviceApi.deletaProduto(excluir).subscribe({
      next: () => {
        alert('Produto deletado!');

        this.deleteModel.set({
          id: null
        });

        this.deleteForm().reset();
      },
      error: () => {
        alert('Algo deu errado no delete!');
      }
    });

    this.deletar.update(valor => [...valor, excluir]);
  };
}

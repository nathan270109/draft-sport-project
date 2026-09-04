import { Service, signal } from '@angular/core';
import { ProdutoCarrinho } from './produto-carrinho';

@Service()
export class CartService {
    produtos = signal<ProdutoCarrinho[]>([]);

    adicionarProduto(produto: ProdutoCarrinho) {
        this.produtos.update(produtosAtuais => [...produtosAtuais, produto]);
    }

    aumentarQuantidade(id: number) {

        this.produtos.update(produtosAtuais => {

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (produtosAtuais[i].id === id) {
                    produtosAtuais[i].quantidade++;
                }

            }

            return [...produtosAtuais];

        });

    }

    diminuirQuantidade(id: number) {

        this.produtos.update(produtosAtuais => {

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (produtosAtuais[i].id === id && produtosAtuais[i].quantidade > 1) {
                    produtosAtuais[i].quantidade--;
                }

            }

            return [...produtosAtuais];

        });

    }
}

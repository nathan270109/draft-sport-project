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

    removerProduto(id: number) {

        this.produtos.update(produtosAtuais => {

            const novosProdutos: ProdutoCarrinho[] = [];

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (produtosAtuais[i].id !== id) {
                    novosProdutos.push(produtosAtuais[i]);
                }

            }

            return novosProdutos;

        });

    }

    esvaziarCarrinho() {
        this.produtos.set([]);
    }

    calcularSubtotal() {

        let subtotal = 0;

        for (let i = 0; i < this.produtos().length; i++) {

            subtotal += this.produtos()[i].preco * this.produtos()[i].quantidade;

        }

        return subtotal;

    }


}

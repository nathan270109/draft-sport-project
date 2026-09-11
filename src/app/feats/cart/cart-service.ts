import { Injectable, signal } from '@angular/core';
import { ProdutoCarrinho } from './produto-carrinho';

// Serviço compartilhado: a mesma instância é usada pelo detalhe e pela página do carrinho.
@Injectable({ providedIn: 'root' })
export class CartService {
    produtos = signal<ProdutoCarrinho[]>([]);

    adicionarProduto(produto: ProdutoCarrinho) {

        this.produtos.update(produtosAtuais => {

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (
                    produtosAtuais[i].id === produto.id &&
                    produtosAtuais[i].tamanho === produto.tamanho
                ) {
                    produtosAtuais[i].quantidade += produto.quantidade;

                    return [...produtosAtuais];
                }

            }

            return [...produtosAtuais, produto];

        });

    }

    aumentarQuantidade(id: number, tamanho: string) {

        this.produtos.update(produtosAtuais => {

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (
                    produtosAtuais[i].id === id &&
                    produtosAtuais[i].tamanho === tamanho
                ) {
                    produtosAtuais[i].quantidade++;
                }

            }

            return [...produtosAtuais];

        });

    }

    diminuirQuantidade(id: number, tamanho: string) {

        this.produtos.update(produtosAtuais => {

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (
                    produtosAtuais[i].id === id &&
                    produtosAtuais[i].tamanho === tamanho &&
                    produtosAtuais[i].quantidade > 1
                ) {
                    produtosAtuais[i].quantidade--;
                }

            }

            return [...produtosAtuais];

        });

    }

    removerProduto(id: number, tamanho: string) {

        this.produtos.update(produtosAtuais => {

            const novosProdutos: ProdutoCarrinho[] = [];

            for (let i = 0; i < produtosAtuais.length; i++) {

                if (
                    produtosAtuais[i].id !== id ||
                    produtosAtuais[i].tamanho !== tamanho
                ) {
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

    calcularQuantidadeProdutos() {

        let quantidade = 0;

        for (let i = 0; i < this.produtos().length; i++) {

            quantidade += this.produtos()[i].quantidade;

        }

        return quantidade;

    }


}

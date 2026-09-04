import { Component, inject } from '@angular/core';
import { CartService } from './cart-service';
import { ProdutoCarrinho } from './produto-carrinho';
@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  protected readonly cartService= inject(CartService);

  adicionarProdutoTeste(){
    const produto: ProdutoCarrinho = {
      id: 1,
      nome: 'Tênis Adistar Control 5',
      descricao: 'Cloud White / Orbit Grey / Champagne Met.',
      preco: 999.99,
      imagem: '',
      tamanho: 37,
      quantidade: 1
    };

    this.cartService.adicionarProduto(produto);
  }
}

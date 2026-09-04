import { Service, signal } from '@angular/core';
import { ProdutoCarrinho } from './produto-carrinho';

@Service()
export class CartService {
    produtos = signal<ProdutoCarrinho[]>([]);
}

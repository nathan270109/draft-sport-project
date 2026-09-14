import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart-service';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  protected readonly cartService = inject(CartService);

  private readonly router = inject(Router);

  formatarPreco(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  finalizarCompra() {
    this.cartService.esvaziarCarrinho();
    this.router.navigate(['/compra-realizada']);
  }
}

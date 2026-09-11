import { Component, computed, ElementRef, inject, ViewChild } from '@angular/core';
import { ProductService } from './product-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-carrossel',
  styleUrl: './carrossel.css',
  templateUrl: './carrossel.html',
})
export class Carrossel {
  readonly carrosselService = inject(ProductService);

  @ViewChild('carouselTrack') track!: ElementRef<HTMLDivElement>;

  readonly scrollAmount = 500;

  // Duplicamos os produtos [A, B, C, D, A, B, C, D] para permitir o loop contínuo
  readonly productsList = computed(() => [
    ...this.carrosselService.products(),
    ...this.carrosselService.products()
  ]);

  scrollRight(): void {
    if (!this.track?.nativeElement) return;
    const el = this.track.nativeElement;
    const metadeDaLargura = el.scrollWidth / 2;

    // Se passou da metade (entrou no 2º bloco de produtos)
    if (el.scrollLeft >= metadeDaLargura) {
      // Pula instantaneamente de volta para o 1º bloco sem animação
      el.style.scrollBehavior = 'auto';
      el.scrollLeft -= metadeDaLargura;
    }

    // Aplica a rolagem suave para a direita
    requestAnimationFrame(() => {
      el.style.scrollBehavior = 'smooth';
      el.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    });
  }

  scrollLeft(): void {
    if (!this.track?.nativeElement) return;
    const el = this.track.nativeElement;
    const metadeDaLargura = el.scrollWidth / 2;

    // Se está no início do 1º bloco e quer voltar
    if (el.scrollLeft <= 10) {
      // Pula instantaneamente para a mesma posição no 2º bloco sem animação
      el.style.scrollBehavior = 'auto';
      el.scrollLeft += metadeDaLargura;
    }

    // Aplica a rolagem suave para a esquerda
    requestAnimationFrame(() => {
      el.style.scrollBehavior = 'smooth';
      el.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    });
  }
}

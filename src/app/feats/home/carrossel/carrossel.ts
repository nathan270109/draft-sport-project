import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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

  readonly scroLLAmount = 500;

  scrollLeft(): void {
    if (this.track?.nativeElement) return;
    const el = this.track.nativeElement;

    if (el.scrollLeft <= 5) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -this.scroLLAmount, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (!this.track?.nativeElement) return;
    const el = this.track.nativeElement;

    // Calcula a ponta máxima onde a tela consegue ir
    const maxScroll = el.scrollWidth - el.clientWidth;

    // Se o macaco já chegou no último galho da direita
    if (el.scrollLeft >= maxScroll - 5) {
      // Pula de volta pro começo de tudo! (Produtor A)
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Senão, só anda um tiquinho pra direita
      el.scrollBy({ left: this.scroLLAmount, behavior: 'smooth' });
    }
  }
}

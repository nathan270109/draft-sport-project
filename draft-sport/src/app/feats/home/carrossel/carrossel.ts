import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';

import { form, FormField } from '@angular/forms/signals';
import { ProductService } from './product-service';

@Component({
  imports: [FormField],
  selector: 'app-carrossel',
  styleUrl: './carrossel.css',
  templateUrl: './carrossel.html',
}) 
export class Carrossel {

  protected readonly carrosselService = inject(ProductService);

  //////////////////////////

  @ViewChild('carouselTrack') track!: ElementRef<HTMLDivElement>;

  readonly scrollAmount = 500; 

  scrollLeft(): void {
    if (this.track?.nativeElement) {
      this.track.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.track?.nativeElement) {
      this.track.nativeElement.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    }
  }
}

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProductService } from './product-service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
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

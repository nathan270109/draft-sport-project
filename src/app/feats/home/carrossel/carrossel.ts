import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProdutosApiService } from '../../produtos/produtos-api.service';

type CarouselProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
};

@Component({
  selector: 'app-carrossel',
  imports: [RouterLink],
  templateUrl: './carrossel.html',
  styleUrl: './carrossel.css',
})
export class Carrossel {
  private readonly produtosApi = inject(ProdutosApiService);
  private readonly router = inject(Router);

  readonly products = signal<CarouselProduct[]>([]);

  @ViewChild('carouselTrack') track!: ElementRef<HTMLDivElement>;

  readonly scrollAmount = 500;

  constructor() {
    this.produtosApi.listarParaLoja().subscribe({
      next: (produtos) => {
        this.products.set(
          produtos.map((produto) => ({
            id: produto.id,
            name: produto.nome,
            price: produto.preco,
            image: produto.imagem,
          })),
        );
      },
      error: () => {
        this.products.set([]);
      },
    });
  }

  readonly productsList = computed(() => {
    const itens = this.products();
    return [...itens, ...itens];
  });

  abrirDetalhe(id: number | null): void {
    if (id === null || id === undefined) {
      return;
    }

    this.router.navigate(['/produtos', id]);
  }

  onTeclaProduto(event: KeyboardEvent, id: number | null): void {
    if ((event.key === 'Enter' || event.key === ' ') && id !== null && id !== undefined) {
      event.preventDefault();
      this.abrirDetalhe(id);
    }
  }

  scrollRight(): void {
    if (!this.track?.nativeElement) return;

    const el = this.track.nativeElement;
    const metadeDaLargura = el.scrollWidth / 2;

    if (el.scrollLeft >= metadeDaLargura) {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft -= metadeDaLargura;
    }

    requestAnimationFrame(() => {
      el.style.scrollBehavior = 'smooth';
      el.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    });
  }

  scrollLeft(): void {
    if (!this.track?.nativeElement) return;

    const el = this.track.nativeElement;
    const metadeDaLargura = el.scrollWidth / 2;

    if (el.scrollLeft <= 10) {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft += metadeDaLargura;
    }

    requestAnimationFrame(() => {
      el.style.scrollBehavior = 'smooth';
      el.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    });
  }
}
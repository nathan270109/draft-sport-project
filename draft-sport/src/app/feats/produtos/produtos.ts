import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, map, merge, of, switchMap, tap } from 'rxjs';
import { ProdutoListItem } from './produto.model';
import { ProdutosApiService } from './produtos-api.service';

type CatalogState = 'loading' | 'loaded' | 'empty' | 'search-empty' | 'error';

@Component({
  imports: [RouterLink],
  selector: 'app-produtos',
  styleUrl: './produtos.css',
  templateUrl: './produtos.html',
})
export class Produtos implements OnInit {
  private readonly produtosApi = inject(ProdutosApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchTerms = new Subject<string>();
  private readonly retryTerms = new Subject<string>();
  private readonly imageFallback =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"%3E%3Crect width="160" height="160" fill="%23edf2ef"/%3E%3Cpath d="M40 112 67 82l18 18 13-14 22 26H40Z" fill="%23bed2bf"/%3E%3Ccircle cx="61" cy="57" r="11" fill="%23bed2bf"/%3E%3C/svg%3E';

  protected readonly products = signal<ProdutoListItem[]>([]);
  protected readonly currentSearchTerm = signal('');
  protected readonly currentState = signal<CatalogState>('loading');
  protected readonly productCount = computed(() => this.products().length);
  protected readonly catalogTotal = computed(() => this.products().reduce((total, product) => total + product.preco, 0));
  protected readonly statusLabel = computed(() => {
    switch (this.currentState()) {
      case 'loading':
        return 'Atualizando catálogo';
      case 'loaded':
        return 'Catálogo atualizado';
      case 'error':
        return 'Conexão indisponível';
      default:
        return 'Catálogo vazio';
    }
  });

  ngOnInit(): void {
    merge(
      of(''),
      this.searchTerms.pipe(debounceTime(350), distinctUntilChanged()),
      this.retryTerms,
    )
      .pipe(
        tap(() => this.currentState.set('loading')),
        switchMap((term) =>
          this.produtosApi.list(term).pipe(
            map((products) => ({ products, failed: false })),
            catchError(() => of({ products: [] as ProdutoListItem[], failed: true })),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ products, failed }) => {
        if (failed) {
          this.products.set([]);
          this.currentState.set('error');
          return;
        }

        this.products.set(products);
        this.currentState.set(
          products.length > 0 ? 'loaded' : this.currentSearchTerm() ? 'search-empty' : 'empty',
        );
      });
  }

  protected onSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value.trim();
    this.currentSearchTerm.set(term);
    this.searchTerms.next(term);
  }

  protected retryLoad(): void {
    this.retryTerms.next(this.currentSearchTerm());
  }

  protected formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  protected useImageFallback(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.dataset['fallbackApplied']) {
      return;
    }

    image.dataset['fallbackApplied'] = 'true';
    image.src = this.imageFallback;
  }
}

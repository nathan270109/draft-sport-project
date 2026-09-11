import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Produtos } from './produtos';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { of } from 'rxjs';
import { ProdutosApiService } from './produtos-api.service';

registerLocaleData(localePt, 'pt-BR');

describe('Produtos', () => {
  let component: Produtos;
  let fixture: ComponentFixture<Produtos>;
  const produtosApi = {
    listarParaLoja: vi.fn(() =>
      of([
        {
          id: 1,
          nome: 'Tênis Nike Air Zoom',
          descricao: '',
          preco: 649.9,
          imagem: 'https://exemplo.com/tenis.jpg',
          tamanhos: ['Único'],
          categoria: 'Esporte',
        },
        {
          id: 2,
          nome: 'Jaqueta Corta Vento',
          descricao: '',
          preco: 289.9,
          imagem: 'https://exemplo.com/jaqueta.jpg',
          tamanhos: ['Único'],
          categoria: 'Esporte',
        },
      ]),
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produtos],
      providers: [
        provideRouter([]),
        { provide: ProdutosApiService, useValue: produtosApi },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Produtos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve filtrar os produtos pela busca no catálogo', async () => {
    component.termoBusca = 'air';
    fixture.detectChanges();
    await fixture.whenStable();

    const cards = fixture.nativeElement.querySelectorAll('.card-produto');

    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('Tênis Nike Air Zoom');
  });

  it('deve mostrar o estado vazio quando não encontrar produtos', async () => {
    component.termoBusca = 'produto que não existe';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain(
      'Nenhum produto encontrado.',
    );
  });
});

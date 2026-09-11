import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
  Router,
} from '@angular/router';
import { ProdutoDetalhe } from './produto-detalhe';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { of, throwError } from 'rxjs';
import { CartService } from '../cart/cart-service';
import { ProdutosApiService } from '../produtos/produtos-api.service';

registerLocaleData(localePt, 'pt-BR');

const produtoDaApi = {
  id: 1,
  nome: 'Tênis Nike Air Zoom',
  descricao: 'Tênis leve para corrida.',
  preco: 649.9,
  imagem: 'https://exemplo.com/tenis.jpg',
  tamanhos: ['Único'],
  categoria: 'Esporte',
};

const produtosApi = {
  buscarParaLoja: vi.fn((id: number) =>
    id === 1 ? of(produtoDaApi) : throwError(() => new Error('Não encontrado')),
  ),
  listarParaLoja: vi.fn(() =>
    of([
      produtoDaApi,
      { ...produtoDaApi, id: 2, nome: 'Jaqueta Corta Vento' },
    ]),
  ),
};

describe('ProdutoDetalhe', () => {
  let component: ProdutoDetalhe;
  let fixture: ComponentFixture<ProdutoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhe],
      providers: [
        provideRouter([]),
        { provide: ProdutosApiService, useValue: produtosApi },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('não deve diminuir a quantidade para menos de 1', () => {
    component.diminuirQuantidade();

    expect(component.quantidade).toBe(1);
  });

  it('não deve repetir o produto aberto nos relacionados', () => {
    const incluiProdutoAtual = component.relacionados.some(
      (produto) => produto.id === component.produto?.id,
    );

    expect(incluiProdutoAtual).toBe(false);
  });

  it('deve adicionar o produto selecionado ao carrinho e navegar para /cart', () => {
    const cartService = TestBed.inject(CartService);
    const router = TestBed.inject(Router);
    const navegarParaCarrinho = vi.spyOn(router, 'navigate');

    component.selecionarTamanho('Único');
    component.aumentarQuantidade();
    component.adicionarAoCarrinho();

    expect(cartService.produtos()).toContainEqual(
      expect.objectContaining({
        id: 1,
        tamanho: 'Único',
        quantidade: 2,
      }),
    );
    expect(navegarParaCarrinho).toHaveBeenCalledWith(['/cart']);
  });
});

describe('ProdutoDetalhe com produto inexistente', () => {
  let component: ProdutoDetalhe;
  let fixture: ComponentFixture<ProdutoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhe],
      providers: [
        provideRouter([]),
        { provide: ProdutosApiService, useValue: produtosApi },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '999' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalhe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('deve informar que o produto não foi encontrado', () => {
    expect(component.produto).toBeUndefined();
    expect(fixture.nativeElement.textContent).toContain(
      'Produto não encontrado',
    );
  });
});

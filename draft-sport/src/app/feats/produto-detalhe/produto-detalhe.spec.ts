import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ProdutoDetalhe } from './produto-detalhe';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { of } from 'rxjs';

registerLocaleData(localePt, 'pt-BR');

describe('ProdutoDetalhe', () => {
  let component: ProdutoDetalhe;
  let fixture: ComponentFixture<ProdutoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhe],
      providers: [
        provideRouter([]),
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
});

describe('ProdutoDetalhe com produto inexistente', () => {
  let component: ProdutoDetalhe;
  let fixture: ComponentFixture<ProdutoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhe],
      providers: [
        provideRouter([]),
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

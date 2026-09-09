import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProdutoDetalhe } from './produto-detalhe';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

describe('ProdutoDetalhe', () => {
  let component: ProdutoDetalhe;
  let fixture: ComponentFixture<ProdutoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoDetalhe],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

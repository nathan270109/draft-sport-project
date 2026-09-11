import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProdutosApiService } from '../produtos/produtos-api.service';
import { AdminProdutos } from './admin-produtos';

describe('AdminProdutos', () => {
  let component: AdminProdutos;
  let fixture: ComponentFixture<AdminProdutos>;
  const produtosApi = {
    listar: vi.fn(() => of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProdutos],
      providers: [{ provide: ProdutosApiService, useValue: produtosApi }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProdutos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('deve carregar a lista de produtos ao iniciar', () => {
    expect(component).toBeTruthy();
    expect(produtosApi.listar).toHaveBeenCalled();
  });

  it('deve mostrar cinco produtos inicialmente e expandir a lista ao clicar em ver mais', () => {
    component.produtos = Array.from({ length: 6 }, (_, indice) => ({
      id: indice + 1,
      nome: `Produto ${indice + 1}`,
      preco: 10,
      urlImagem: 'https://exemplo.com/imagem.jpg',
    }));

    expect(component.produtosVisiveis).toHaveLength(5);
    expect(component.existemMaisProdutos).toBe(true);

    component.verMaisProdutos();

    expect(component.produtosVisiveis).toHaveLength(6);
  });
});

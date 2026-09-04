import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../core/api.config';
import { ProdutoRequest } from './produto.model';
import { ProdutosApiService } from './produtos-api.service';

describe('ProdutosApiService', () => {
  let service: ProdutosApiService;
  let httpTesting: HttpTestingController;
  const baseUrl = 'http://api.example.test';
  const produto: ProdutoRequest = {
    nome: 'Camiseta Performance',
    descricao: 'Tecido leve para treino.',
    preco: 149.9,
    urlImagem: 'https://images.example.test/camiseta.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl },
      ],
    });

    service = TestBed.inject(ProdutosApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('lists products without a filter', () => {
    service.list().subscribe();

    const request = httpTesting.expectOne(`${baseUrl}/produtos`);
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('lists products filtered by name', () => {
    service.list('camiseta').subscribe();

    const request = httpTesting.expectOne(`${baseUrl}/produtos?nome=camiseta`);
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('gets a product by id', () => {
    service.getById(7).subscribe();

    const request = httpTesting.expectOne(`${baseUrl}/produtos/7`);
    expect(request.request.method).toBe('GET');
    request.flush({ id: 7, ...produto });
  });

  it('creates a product with the API contract', () => {
    service.create(produto).subscribe();

    const request = httpTesting.expectOne(`${baseUrl}/produtos`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(produto);
    request.flush({ id: 7, ...produto });
  });

  it('updates a product with the API contract', () => {
    service.update(7, produto).subscribe();

    const request = httpTesting.expectOne(`${baseUrl}/produtos/7`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(produto);
    request.flush({ id: 7, ...produto });
  });

  it('deletes a product by id', () => {
    service.delete(7).subscribe();

    const request = httpTesting.expectOne(`${baseUrl}/produtos/7`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});

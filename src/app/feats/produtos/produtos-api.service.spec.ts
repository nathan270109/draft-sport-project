import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProdutosApiService } from './produtos-api.service';

describe('ProdutosApiService', () => {
  let service: ProdutosApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProdutosApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('deve listar produtos enviando o filtro de nome para a API', () => {
    service.listar('tênis').subscribe((produtos) => {
      expect(produtos).toEqual([
        {
          id: 1,
          nome: 'Tênis de corrida',
          preco: 299.9,
          urlImagem: 'https://exemplo.com/tenis.jpg',
        },
      ]);
    });

    const requisicao = httpTesting.expectOne(
      (request) =>
        request.url === '/backend/produtos' &&
        request.params.get('nome') === 'tênis',
    );

    expect(requisicao.request.method).toBe('GET');
    requisicao.flush([
      {
        id: 1,
        nome: 'Tênis de corrida',
        preco: 299.9,
        urlImagem: 'https://exemplo.com/tenis.jpg',
      },
    ]);
  });

  it('deve buscar o detalhe de um produto pelo id', () => {
    service.buscarPorId(1).subscribe((produto) => {
      expect(produto.descricao).toBe('Tênis leve para corrida.');
    });

    const requisicao = httpTesting.expectOne(
      '/backend/produtos/1',
    );

    expect(requisicao.request.method).toBe('GET');
    requisicao.flush({
      id: 1,
      nome: 'Tênis de corrida',
      descricao: 'Tênis leve para corrida.',
      preco: 299.9,
      urlImagem: 'https://exemplo.com/tenis.jpg',
    });
  });

  it('deve enviar um POST para criar um produto', () => {
    const novoProduto = {
      nome: 'Camiseta esportiva',
      descricao: 'Camiseta leve para treinos.',
      preco: 129.9,
      urlImagem: 'https://exemplo.com/camiseta.jpg',
    };

    service.criar(novoProduto).subscribe((produto) => {
      expect(produto.id).toBe(3);
    });

    const requisicao = httpTesting.expectOne('/backend/produtos');

    expect(requisicao.request.method).toBe('POST');
    expect(requisicao.request.body).toEqual(novoProduto);
    requisicao.flush({ id: 3, ...novoProduto });
  });

  it('deve enviar um PUT para atualizar um produto', () => {
    const produtoAtualizado = {
      nome: 'Camiseta atualizada',
      descricao: 'Nova descrição.',
      preco: 139.9,
      urlImagem: 'https://exemplo.com/camiseta-atualizada.jpg',
    };

    service.atualizar(3, produtoAtualizado).subscribe((produto) => {
      expect(produto.nome).toBe('Camiseta atualizada');
    });

    const requisicao = httpTesting.expectOne('/backend/produtos/3');

    expect(requisicao.request.method).toBe('PUT');
    expect(requisicao.request.body).toEqual(produtoAtualizado);
    requisicao.flush({ id: 3, ...produtoAtualizado });
  });

  it('deve enviar um DELETE para excluir um produto', () => {
    service.excluir(3).subscribe();

    const requisicao = httpTesting.expectOne('/backend/produtos/3');

    expect(requisicao.request.method).toBe('DELETE');
    requisicao.flush(null);
  });
});

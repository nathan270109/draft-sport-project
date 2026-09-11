import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InterfaceProdutosTs as Produto } from './interface-produtos';
import {
  ProdutoListResponseApi,
  ProdutoRequestApi,
  ProdutoResponseApi,
} from './produto-api';

@Injectable({ providedIn: 'root' })
export class ProdutosApiService {
  // No desenvolvimento, o Angular encaminha /backend para o Spring Boot na porta 8080.
  private readonly apiUrl = '/backend/produtos';

  constructor(private http: HttpClient) {}

  listar(nome?: string, descricao?: string): Observable<ProdutoListResponseApi[]> {
    let params = new HttpParams();

    // A API aceita os filtros opcionais nome e descricao como query params.
    if (nome?.trim()) {
      params = params.set('nome', nome.trim());
    }

    if (descricao?.trim()) {
      params = params.set('descricao', descricao.trim());
    }

    return this.http.get<ProdutoListResponseApi[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<ProdutoResponseApi> {
    return this.http.get<ProdutoResponseApi>(`${this.apiUrl}/${id}`);
  }

  // Métodos usados pela loja pública. Eles adaptam o JSON da API ao modelo da tela.
  listarParaLoja(): Observable<Produto[]> {
    return this.listar().pipe(
      map((produtos) => produtos.map((produto) => this.paraProdutoLoja(produto))),
    );
  }

  buscarParaLoja(id: number): Observable<Produto> {
    return this.buscarPorId(id).pipe(
      map((produto) => this.paraProdutoLoja(produto)),
    );
  }

  criar(produto: ProdutoRequestApi): Observable<ProdutoResponseApi> {
    return this.http.post<ProdutoResponseApi>(this.apiUrl, produto);
  }

  atualizar(
    id: number,
    produto: ProdutoRequestApi,
  ): Observable<ProdutoResponseApi> {
    return this.http.put<ProdutoResponseApi>(`${this.apiUrl}/${id}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private paraProdutoLoja(
    produto: ProdutoListResponseApi | ProdutoResponseApi,
  ): Produto {
    return {
      id: produto.id,
      nome: produto.nome,
      descricao: 'descricao' in produto ? produto.descricao : '',
      preco: produto.preco,
      imagem: produto.urlImagem,
      // A API atual ainda não possui estes campos; são valores temporários da loja.
      tamanhos: ['Único'],
      categoria: 'Esporte',
    };
  }
}

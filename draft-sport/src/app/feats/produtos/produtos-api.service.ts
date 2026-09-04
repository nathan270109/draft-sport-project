import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';
import { Produto, ProdutoListItem, ProdutoRequest } from './produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutosApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly produtosUrl = `${this.apiBaseUrl}/produtos`;

  list(nome?: string): Observable<ProdutoListItem[]> {
    const params = nome ? new HttpParams().set('nome', nome) : undefined;
    return this.http.get<ProdutoListItem[]>(this.produtosUrl, { params });
  }

  getById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.produtosUrl}/${id}`);
  }

  create(produto: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.produtosUrl, produto);
  }

  update(id: number, produto: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.produtosUrl}/${id}`, produto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.produtosUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Produto } from './admin/cadastro-produto/produto';
import { PostResponse } from './admin/cadastro-produto/post-response';

@Service()
export class ServiceApi {

    private readonly httpClient = inject(HttpClient);

    private readonly urlApi = 'http://localhost:8080/produtos';

    // Post da API
    cadastrarProduto(produtoCadastrado: Produto) {
        return this.httpClient.post<PostResponse>(this.urlApi, produtoCadastrado);
    };
}

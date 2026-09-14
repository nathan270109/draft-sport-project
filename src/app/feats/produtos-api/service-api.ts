import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Produto } from './admin/cadastro-produto/produto';
import { PostResponse } from './admin/cadastro-produto/post-response';
import { PutResponse } from './admin/atualiza-produto/put-response';
import { InterfcePut } from './admin/atualiza-produto/interfce-put';

@Service()
export class ServiceApi {

    private readonly httpClient = inject(HttpClient);

    private readonly urlApi = 'http://localhost:8080/produtos';

    // Post da API
    cadastrarProduto(produtoCadastrado: Produto) {
        return this.httpClient.post<PostResponse>(this.urlApi, produtoCadastrado);
    };

    // Put da API
    atualizarProduto(atualizarProduto: InterfcePut) {
        return this.httpClient.put<PutResponse>(this.urlApi + '/' + atualizarProduto.id, atualizarProduto);
    };
}

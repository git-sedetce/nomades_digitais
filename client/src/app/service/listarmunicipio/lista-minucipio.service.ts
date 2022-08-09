import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

//const baseUrl = 'http://localhost:2225/';

@Injectable({
  providedIn: 'root'
})
export class ListaMinucipioService {

  constructor(private httpClient: HttpClient) { }

  listar_municipio(metodo: string): Observable<any> {
    console.log('listar_municipio', environment.url + metodo)
    return this.httpClient.get(environment.url + metodo);
  }

  pegar_regiao(metodo: string, id: any): Observable<any> {
    console.log('pegar_regiao', environment.url + metodo + id)
    return this.httpClient.get(environment.url + metodo + id);
  }
  cadastar_municipio(data: any): Observable<any> {
    console.log('cadastar_municipio', environment.url + data)
    return this.httpClient.post(environment.url + 'parceiroMunicipio', data)
  }


}

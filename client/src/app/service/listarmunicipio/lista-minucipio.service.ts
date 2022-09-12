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
    //console.log('listar_municipio', environment.url + metodo)
    return this.httpClient.get(environment.url + metodo);
  }

  pegar_municipio(metodo: string, cidade: string): Observable<any> {
    //console.log('pegar_municipio', environment.url + metodo + cidade)
    return this.httpClient.get(environment.url + metodo + cidade);
  }

  pegar_regiao(metodo: string, id: any): Observable<any> {
    //console.log('pegar_regiao', environment.url + metodo + id)
    return this.httpClient.get(environment.url + metodo + id);
  }



}

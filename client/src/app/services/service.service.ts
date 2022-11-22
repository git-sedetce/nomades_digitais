import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  cadastrar_municipio(data: any): Observable<any> {
    //console.log('cadastrar_municipio', environment.url + data)
    return this.http.post(environment.url + 'parceiroMunicipio', data)
  }

  cadastrar_parceiro(data: any): Observable<any> {
    //console.log('cadastrar_parceiro', environment.url + data)
    return this.http.post(environment.url + 'parceiro', data)
  }

  cadastrar_nomad(data: any): Observable<any> {
    //console.log('cadastrar_parceiro', environment.url + data)
    return this.http.post(environment.url + 'nomad', data)
  }

  pegar_cnpj(cnpj: any): Observable<any> {
    console.log('cnpj', environment.url + cnpj)
    return this.http.post(environment.url + 'buscarcnpj', cnpj)
  }

  anexar_arquivo(file: File): Observable<any> {
    //console.log('anexar_arquivo', environment.url + file)
    return this.http.post(environment.url + 'parceiro', file)
  }
}

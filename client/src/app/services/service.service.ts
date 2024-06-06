import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Nomad } from '../models/nomad/nomad.model';

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
    return this.http.post(environment.url + 'nomads', data)
  }

  nomadById(id: number): Observable<Nomad> {
    console.log('nomadById', environment.url + id)
    return this.http.post<Nomad>(environment.url + 'nomads', id)
  }

  editar(nomad: Nomad):Observable<Nomad>{
    return this.http.put<Nomad>(environment.url + 'nomads', nomad.id)
  }

  pegar_cnpj(cnpj: string): Observable<any> {
    return this.http.get(environment.url + 'buscarcnpj/' + cnpj)
  }

  anexar_arquivo(file: File): Observable<any> {
    //console.log('anexar_arquivo', environment.url + file)
    return this.http.post(environment.url + 'parceiro', file)
  }
}

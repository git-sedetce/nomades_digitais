import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
    return this.http.post(environment.url + 'nomads', data)
  }

  cadastrar_company(data: any, id: any): Observable<any> {
    return this.http.post(environment.url + 'comapny/' +id, data)
  }

  listar_nomads(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  nomadById(id: number): Observable<Nomad> {
    return this.http.post<Nomad>(environment.url + 'nomads', id)
  }

  editar(nomad: Nomad):Observable<Nomad>{
    return this.http.put<Nomad>(environment.url + 'nomads', nomad.id)
  }

  updateNomad(data: any, id: any){
    return this.http.put<any>(environment.url + 'nomads/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateCompany(data: any, id: any){
    return this.http.put<any>(environment.url + 'companynomads/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  pegar_cnpj(cnpj: string): Observable<any> {
    return this.http.get(environment.url + 'buscarcnpj/' + cnpj)
  }

  nomadByEmail(email: string): Observable<any> {
    return this.http.get(environment.url + 'nomad/' + email)
  }

  nomadEmail(email: string): Observable<any> {
    return this.http.get(environment.url + 'nomadUser/' + email)
  }

  pegar_cnpj_nomad(cnpj: string): Observable<any> {
    return this.http.get(environment.url + 'verificacnpj/' + cnpj)
  }

  anexar_arquivo(file: File): Observable<any> {
    //console.log('anexar_arquivo', environment.url + file)
    return this.http.post(environment.url + 'parceiro', file)
  }

  cidades12(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  cidadeporTurismo(turismo: string): Observable<any> {
    return this.http.get(environment.url + 'cidadeTur/' + turismo);
  }

  getDataCity(cidade: string): Observable<any> {
    return this.http.get(environment.url + 'cidadeDados/' + cidade);
  }

  consultaIBGE(ibge: string){
    return this.http.get(`https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2021/variaveis/9324?localidades=N6[${ibge}]`)
  }
}

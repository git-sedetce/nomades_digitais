import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParceriaService {

  constructor(private http: HttpClient) { }

  pegarParceiros(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo)
  }

  parceirosById(id: number): Observable<any> {
    return this.http.get(environment.url + 'parceiro/' + id)
  }

  parceirosByBairro(metodo: string, bairro: string): Observable<any>{
    return this.http.get(environment.url + metodo + bairro)
  }

  parceirosByMunicipio(metodo: string, municipio: string): Observable<any>{
    return this.http.get(environment.url + metodo + municipio)
  }

  listarBairros(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo)
  }

  listarCidades(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo)
  }

  logoById(id: number): Observable<any> {
    return this.http.get(environment.url + 'logo_parceiro/' + id)
  }

  imagensById(id: number): Observable<any> {
    return this.http.get(environment.url + 'pegaImageParceiro/' + id)
  }


}

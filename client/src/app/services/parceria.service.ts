import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParceriaService {

  constructor(private http: HttpClient) { }

  pegarParceiros(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo)
  }

  pegarHospedagem(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo)
  }

  parceirosById(id: number): Observable<any> {
    return this.http.get(environment.url + 'parceiro/' + id)
  }

  parceirosByEmail(email: any): Observable<any> {
    return this.http.get(environment.url + 'parceiroMail/' + email)
  }

  parceirosByService(metodo: string, service: string): Observable<any> {
    return this.http.get(environment.url + metodo + service)
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

  listarParceiros(metodo: string): Observable<any> {
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

  atualizarParceiro(data: any, id: any){
    return this.http.put<any>(environment.url + 'atualizaParceiro/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  atualizarImagem(data: any, id: any) {
    return this.http
      .put<any>(environment.url + 'atualizaImagem/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteImagem(id: number) {
    return this.http.delete<any>(environment.url + 'deletaimagem/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  atualizarLogo(data: any, id: any) {
    return this.http
      .put<any>(environment.url + 'atualizaLogo/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteLogo(id: number) {
    return this.http.delete<any>(environment.url + 'deletaLogo/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  pegarDocumento(id: number): Observable<any> {
    return this.http.post(environment.url + 'documento/' + id, { responseType: 'text' })
  }

  atualizarDocumento(data: any, id: any){
    return this.http.put<any>(environment.url + 'atualizaDocumento/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  cadastar_municipio(data: any): Observable<any> {
    console.log('cadastar_municipio', environment.url + data)
    return this.http.post(environment.url + 'parceiroMunicipio', data)
  }

  cadastar_parceiro(data: any): Observable<any> {
    console.log('cadastar_parceiro', environment.url + data)
    return this.http.post(environment.url + 'parceiro', data)
  }
}

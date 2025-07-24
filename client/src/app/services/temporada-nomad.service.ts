import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemporadaNomadService {
  constructor(private http: HttpClient) {}

  cadastrarTemporada(data: any): Observable<any> {
    return this.http.post(environment.url + 'cadastratemporada', data);
  }

  listar_temporada(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  pegar_temporada_id(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.url + metodo + id);
  }
}

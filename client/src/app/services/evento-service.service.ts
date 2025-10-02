import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventoServiceService {
  constructor(private http: HttpClient) {}

  cadastrarEvento(data: any): Observable<any> {
    return this.http.post(environment.url + 'cadastraevento', data);
  }

  listar_eventos(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  pegar_evento(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.url + metodo + id);
  }

  eventoById(id: number): Observable<any> {
    return this.http.get(environment.url + 'evento/' + id)
  }

  imagem_eventoById(id: number): Observable<any> {
    return this.http.get(environment.url + 'imagevento/' + id)
  }

  pegar_evento_community(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.url + metodo + id);
  }

  pegar_evento_community_frequency(metodo: string, id: any): Observable<any> {
    return this.http.get(environment.url + metodo + id);
  }
}

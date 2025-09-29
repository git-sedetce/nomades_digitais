import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComunidadeService {
  constructor(private http: HttpClient) {}

  cadastrarComunidade(data: any): Observable<any> {
    return this.http.post(environment.url + 'newcomunity', data);
  }

  cadastrarMidia(data: any): Observable<any> {
    return this.http.post(environment.url + 'newmidiacomunity', data);
  }

  cadastrarEncontro(data: any): Observable<any> {
    return this.http.post(environment.url + 'meetcomunity', data);
  }
}

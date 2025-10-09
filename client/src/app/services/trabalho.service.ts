import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrabalhoService {
  constructor(private http: HttpClient) {}

  cadastrarvaga(data: any): Observable<any> {
    return this.http.post(environment.url + 'cadastrovaga', data);
  }

  getVaga(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  getVagaById(id: any): Observable<any> {
    return this.http.get(environment.url + 'pegarvaga/' + id);
  }

  getVagaByCompanyId(id: any): Observable<any> {
    return this.http.get(environment.url + 'vagabycompany/' + id);
  }

  atualizarVaga(data: any, id: any) {
    return this.http
      .put<any>(environment.url + 'atualizavaga/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteVaga(id: number) {
    return this.http.delete<any>(environment.url + 'deletevaga/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}

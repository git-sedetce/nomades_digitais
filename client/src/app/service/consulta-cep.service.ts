import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  private url = 'https://viacep.com.br/ws';

  constructor(private httpClient: HttpClient) { }

  buscar(cep: string): Observable<any> {
    cep = cep.replace(/\D/g, '');

    if (cep !== '' && /^[0-9]{8}$/.test(cep)) {
      return this.httpClient.get(`${this.url}/${cep}/json`);
    }

    throw new Error('CEP inválido');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {

  constructor(private http: HttpClient) { }

    cadastrarEvento(data:any): Observable<any> {
      return this.http.post(environment.url + 'cadastraevento', data)
    }

}

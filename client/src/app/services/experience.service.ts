import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  registerExperience(data: any): Observable<any> {
    return this.http.post(environment.url + 'registerexperience', data);
  }

  cadastrarExperience(data: any): Observable<any> {
    return this.http.post(environment.url + 'cadastrarexperience', data);
  }

  listar_experiences(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  listar_tipo_experiences(metodo: string): Observable<any> {
    return this.http.get(environment.url + metodo);
  }

  getExperienceById(id: any): Observable<any> {
    return this.http.get(environment.url + 'experience/' +id);
  }

  getParticipanteExperienceById(id: any): Observable<any> {
    return this.http.get(environment.url + 'participantes/' + id);
  }

  verificaParticipantes(id: any): Observable<any> {
    return this.http.get(environment.url + 'verificaparticipantes/' + id);
  }

  updateParticipanteExperience(id: any, data: any): Observable<any> {
    return this.http.put(environment.url + 'participantes/' + id, data);
  }

  deleteParticipanteExperience(id: number) {
    return this.http.delete(environment.url + 'participante-experience/' + id);
  };
}

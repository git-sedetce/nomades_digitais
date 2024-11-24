import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // CriptografarMD5(value: string | undefined): string | undefined{
  //   return Md5.hashStr(value!).toString();
  // }
  private token!: string;
  private userSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router) { }

    cadastrar_users(data:any) : Observable<any> {
      return this.http.post(environment.url + 'register', data)
    }

    pegar_users(metodo: string): Observable<any> {
      return this.http.get(environment.url + metodo)
    }

    login(data:any): Observable<any> {
      return this.http.post<any>(environment.url + 'login', data).pipe(
        tap((response: { token: string; }) => {
        this.token = response.token;
        const payload = JSON.parse(atob(this.token.split('.')[1])); // Decodifica o token para pegar o perfil e outros dados
        this.userSubject.next(payload);
        localStorage.setItem('token', this.token);
        this.router.navigate(['/home']); // Redireciona após login
      }))
    }

    getToken(): string | null {
      return this.token || localStorage.getItem('token');
    }

    resetPin(data:any): Observable<any> {
      return this.http.post(environment.url + 'newPin',  data)
    }

    getUser(){
      return this.userSubject.asObservable();
    }

    isAuthenticated(): boolean {
      return !! this.getToken(); // Verifica se o token existe
    }

    public logout(): Promise<boolean> {
      // Limpa o token do armazenamento local
      this.token = '';
      localStorage.removeItem('token');

      // Navega para a página inicial
      return this.router.navigate(['home']);
    }

    auth_user() : boolean {
      const token = localStorage.getItem('token');
      //console.log('token', token)
      if(!token) return false;
      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(token)
    }

    reset_password(data:any) : Observable<any> {
      return this.http.post(environment.url + 'reset', data)
    }

    atualizarUser(data: any, id: number){
      return this.http.put<any>(environment.url + 'atualizaUser/' +id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    deleteUser(id: number){
      return this.http.delete<any>(environment.url + 'user/' +id)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
}

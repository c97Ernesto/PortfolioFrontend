import { Injectable } from '@angular/core';
import { LoginReq } from './loginReq';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable, catchError, throwError, BehaviorSubject, tap, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;
  public loginStatusSubjec = new Subject<boolean>();

  constructor(
     private http: HttpClient
   ) { }

  // private handleError(error: HttpErrorResponse) {
  //   if(error.status === 0) {
  //     console.error('Se ha producido un error', error.error);
  //   } 
  //   else {
  //     console.error('Backend retornó el código de estado', error.status, error.error);
  //   }
  //   return throwError(() => new Error('Algo falló. Por favor intente nuevamente'));
  // }

  public generateToken(credentials: LoginReq): Observable<any> {
    return this.http.post<User>(`${this.apiServerUrl}/generate-token`, credentials);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${this.apiServerUrl}/actual-usuario`);
  }
}

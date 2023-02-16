// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { BehaviorSubject, Observable } from 'rxjs';

// // // Generación del token, que llega a través de la función "iniciarSesión" 
// // // Conexión directa a la base de datos

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthenticationService {
// //   url = "http://localhost:4200/auth/login";   //donde se encuentra la autentificación del usuario en el backend
// //   currentUserSubject!: BehaviorSubject<any>;

// //   constructor(private httpClient: HttpClient) {
// //     console.log("El servicio de autentificación está corriendo");
// //     //recupero los datos del usuario logueado o vacío si no hay usuario logueado
// //     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
// //   }

// //   //retornamos el token
// //   // iniciarSesion(credenciales: any): Observable<any> {
// //   //   return this.httpClient.post(this.url, credenciales).pipe(map(data => {
// //   //     sessionStorage.setItem('currentUser', JSON.stringify(data));
// //   //     this.currentUserSubject.next(data);
// //   //     return data;
// //   //   }))
// //   // }

// //   get UsuarioAutenticado() {
// //     return this.currentUserSubject.value;
// //   }
// // }

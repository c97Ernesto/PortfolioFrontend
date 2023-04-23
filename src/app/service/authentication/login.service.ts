import { Injectable } from '@angular/core';
import { LoginReq } from './loginReq';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginReq) {
    
    console.log(credentials);
  }
}

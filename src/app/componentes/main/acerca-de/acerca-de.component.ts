import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/authentication/login.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent{
  
  isLogged = false;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.loginService.isLoggedIn();
  }
  
}

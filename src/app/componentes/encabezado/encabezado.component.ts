import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/authentication/login.service';
import { User } from 'src/app/service/authentication/user';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  isLogged = false  

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.loginService.isLoggedIn();
  }

  public login() {
    this.router.navigateByUrl('/login');
  }

  public logout() {
    this.isLogged = !this.loginService.logout;
    window.location.reload();
  }
}

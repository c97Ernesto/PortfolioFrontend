import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/authentication/login.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit{
  isLoggedIn = false  
  //user: User;

  constructor(
    public loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    //this.user = this.loginService.getUser();
    this.loginService.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        //this.user = this.loginService.getUser();
      }
    )
  }

  public logIn() {
    this.router.navigateByUrl('/login');
  }

  public logOut() {
    this.loginService.logout();
    window.location.reload();
  }
}

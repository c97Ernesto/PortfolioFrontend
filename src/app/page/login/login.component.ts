import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/service/authentication/login.service';
import { LoginReq } from 'src/app/service/authentication/loginReq';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFailed = false;

  loginError: '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  public onSubmit() {
    if (this.loginForm.valid){
      this.loginService.generateToken(this.loginForm.value as LoginReq).subscribe(
        (data:any) => {
          console.log(data);
          this.loginService.loginUser(data.token);
          this.isLogged = true;
          this.loginService.getCurrentUser().subscribe((user:any) => {
            this.loginService.setUser(user);
            console.log(user);
            if(this.loginService.getUserRole() == 'ADMIN'){
              this.router.navigate(['/']);
              this.loginService.loginStatusSubjec.next(true);
              
            }
            else if(this.loginService.getUserRole() == 'NORMAL'){
              this.router.navigate(['/']);
              this.loginService.loginStatusSubjec.next(true);
            }
            else{
              this.loginService.logout();
            }
          });
        }, error => {
          this.isLogged = false;
          this.isLoginFailed = true;
          alert("Detalles inválidos, vuelve a intentar!!");
        }
      )}
    }
  }
        
  



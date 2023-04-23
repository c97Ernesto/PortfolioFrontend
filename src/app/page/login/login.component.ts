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
  type: string ="password"

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
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

  public onLogin() {
    if (this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginReq);
      console.log(this.loginForm.value);
      this.loginForm.reset();

    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}

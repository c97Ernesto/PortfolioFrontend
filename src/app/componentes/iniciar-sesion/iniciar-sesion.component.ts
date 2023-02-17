import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //hacemos la inyección de "AuthenticationService" para poder autentificar el mail del usuario
    // private authenticationService: AuthenticationService,
    private rutas: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  // onEnviar(event: Event) {
  //   event.preventDefault();
  //   this.authenticationService.iniciarSesion(this.form.value).subscribe(data => {

  //   })
  // }
}

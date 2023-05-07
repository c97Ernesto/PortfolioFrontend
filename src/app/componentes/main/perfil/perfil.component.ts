import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { LoginService } from 'src/app/service/authentication/login.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  persona: Persona;

  isLogged = false;

  constructor (
    private personaService: PersonaService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.obtenerPersona();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerPersona(): void {
    this.personaService.obtenerPersona(1).subscribe(
      (data: Persona) => {
        this.persona = data;
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
}

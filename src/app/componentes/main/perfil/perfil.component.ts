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
  editPersona: Persona;
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

  public onActualizarPersona(persona: Persona): void {
    this.personaService.actualizarPersona(persona).subscribe(
      (response: Persona) => {
        console.log("Actualizado");
        // console.log(response);
        this.obtenerPersona();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(persona: Persona, modo: string) {
    const contenedor = document.getElementById('container-persona');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'actualizar') {
      this.editPersona = persona;
      boton.setAttribute('data-bs-target', '#actualizarPersonaModal');
    }
    
    contenedor.appendChild(boton);
    boton.click();

  }
}

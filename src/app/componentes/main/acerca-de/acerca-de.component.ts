import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { LoginService } from 'src/app/service/authentication/login.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent{
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
        console.log(error.message)
      }
    )
  }

  public onActualizarAcercaDe(persona: Persona): void {
    this.personaService.actualizarPersona(persona).subscribe(
      (response: Persona) => {
        console.log("Acerca de, actualizado");
        console.log(response);
        this.obtenerPersona();
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onOpenModal(persona: Persona, modo: string) {
    const contenedor = document.getElementById('container-acercaDe');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'actualizar') {
      this.editPersona = persona;
      boton.setAttribute('data-bs-target', '#actualizarAcercaDeModal');
    }
    
    contenedor.appendChild(boton);
    boton.click();

  }  
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona.model';
import { LoginService } from 'src/app/service/authentication/login.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  persona: Persona;
  isLogged = false;

  formPerfil: FormGroup;

  constructor(private personaService: PersonaService, private loginService: LoginService, private fb: FormBuilder) {
    this.formPerfil = this.fb.group({
      id: [],
      nombre: ['',[Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['',[Validators.required, Validators.minLength(2),Validators.pattern('[a-zA-Z ]*')]],
      titulo: [],
      sobreMi: [],
      telefono: [],
      email: ['',[Validators.email]],
      imgPerfilUrl: [],
      imgFondo: [],
    });
  }

  get nombre() { return this.formPerfil.get('nombre'); }
  get apellido() { return this.formPerfil.get('apellido'); }
  get email() { return this.formPerfil.get('email');}
  

  ngOnInit(): void {
    this.obtenerPersona();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerPersona(): void {
    this.personaService.obtenerPersona(1).subscribe(
      (data: Persona) => {
        this.persona = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onActualizarPersona(): void {
    if (this.formPerfil.valid){
      let persona = new Persona(
        this.formPerfil.value.id,
        this.formPerfil.value.nombre,
        this.formPerfil.value.apellido,
        this.formPerfil.value.titulo,
        this.formPerfil.value.sobreMi,
        this.formPerfil.value.telefono,
        this.formPerfil.value.email,
        this.formPerfil.value.imgPerfilUrl,
        this.formPerfil.value.imgFondo,
      );

      this.personaService.actualizarPersona(persona).subscribe(
        (response: Persona) => {
          console.log('Actualizado');
          // console.log(response);
          this.obtenerPersona();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.formPerfil.markAllAsTouched();
    }
    console.log(this.formPerfil)
  }

  private setValueForm(persona: Persona){
    this.formPerfil.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      titulo: persona.titulo,
      sobreMi: persona.sobreMi,
      telefono: persona.telefono,
      email: persona.email,
      imgPerfilUrl: persona.imgPerfilUrl,
      imgFondo: persona.imgFondo,
    });
  }

  public onOpenModal(persona: Persona, modo: string) {
    const contenedor = document.getElementById('container-persona');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'actualizar') {
      this.setValueForm(persona);
      boton.setAttribute('data-bs-target', '#actualizarPersonaModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }
}

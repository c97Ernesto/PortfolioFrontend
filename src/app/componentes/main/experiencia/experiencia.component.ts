import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { LoginService } from 'src/app/service/authentication/login.service';
import { ExperienciaService } from 'src/app/service/experiencia.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  experiencia: Experiencia[] = [];
  editExperiencia: Experiencia;
  deleteExperiencia: Experiencia;

  isLogged = false;

  constructor(
    private experienciaService: ExperienciaService,
    private loginService: LoginService
  ){ }

  ngOnInit(): void {
    this.obtenerExperiencia();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerExperiencia(): void {
    this.experienciaService.obtenerExperiencia().subscribe(
      (response: Experiencia[]) => {
        this.experiencia = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarExperiencia(formulario: NgForm): void {
    // console.log(formulario);
    // console.log(formulario.value)
    this.experienciaService.agregarExperiencia(formulario.value).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.obtenerExperiencia();
        formulario.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        formulario.reset();
      }
    );
  }

  public onActualizarExperiencia(experiencia: Experiencia): void {
    this.experienciaService.actualizarExperiencia(experiencia).subscribe(
      (response: Experiencia) => {
        console.log("Actualizado");
        // console.log(response);
        this.obtenerExperiencia();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEliminarExperiencia(id: number): void {
    this.experienciaService.eliminarExperiencia(id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerExperiencia();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(experiencia: Experiencia, modo: string) {
    const contenedor = document.getElementById('container-experiencia');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarExperienciaModal');
    }
    if (modo === 'actualizar') {
      this.editExperiencia = experiencia;
      boton.setAttribute('data-bs-target', '#actualizarExperienciaModal');
    }
    if (modo === 'eliminar') {
      this.deleteExperiencia = experiencia;
      boton.setAttribute('data-bs-target', '#eliminarExperienciaModal');
    }

    contenedor.appendChild(boton);
    boton.click();

  }


}


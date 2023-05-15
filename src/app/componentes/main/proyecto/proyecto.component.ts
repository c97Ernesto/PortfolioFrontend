import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/model/proyecto';
import { LoginService } from 'src/app/service/authentication/login.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {
  proyectos: Proyecto[] = [];
  editProyecto: Proyecto;
  deleteProyecto: Proyecto;

  isLogged = false;

  constructor(
    private proyectoService: ProyectoService,
    private loginService: LoginService
  ){ }

  ngOnInit(): void {
    this.obtenerProyecto();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerProyecto(): void {
    this.proyectoService.obtenerProyectos().subscribe(
      (response: Proyecto[]) => {
        this.proyectos = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarProyecto(formulario: NgForm): void {
    // console.log(formulario);
    // console.log(formulario.value)
    this.proyectoService.agregarProyecto(formulario.value).subscribe(
      (response: Proyecto) => {
        console.log(response);
        this.obtenerProyecto();
        formulario.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        formulario.reset();
      }
    );
  }

  public onActualizarProyecto(proyecto: Proyecto): void {
    this.proyectoService.actualizarProyecto(proyecto).subscribe(
      (response: Proyecto) => {
        console.log("Actualizado");
        // console.log(response);
        this.obtenerProyecto();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEliminarProyecto(id: number): void {
    this.proyectoService.eliminarProyecto(id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerProyecto();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(proyecto: Proyecto, modo: string) {
    const contenedor = document.getElementById('container-proyecto');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarProyectoModal');
    }
    if (modo === 'actualizar') {
      this.editProyecto = proyecto;
      boton.setAttribute('data-bs-target', '#actualizarProyectoModal');
    }
    if (modo === 'eliminar') {
      this.deleteProyecto = proyecto;
      boton.setAttribute('data-bs-target', '#eliminarProyectoModal');
    }

    contenedor.appendChild(boton);
    boton.click();

  }
}

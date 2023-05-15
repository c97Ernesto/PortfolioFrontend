import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion';
import { LoginService } from 'src/app/service/authentication/login.service';
import { EducacionService } from 'src/app/service/educacion.service';
//Con FormGroup, indentificamos el formDeCreacion y todo su contenido
//FormBuilder, directiva para formar un grupo de componentes que va dentro del form

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  estudios: Educacion[] = [];
  editEducacion: Educacion;
  deleteEducacion: Educacion;

  isLogged = false;

  constructor(
    private estudioService: EducacionService,
    private loginService: LoginService,
  ){ }

  ngOnInit(): void {
    this.obtenerEstudios();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerEstudios(): void {
    this.estudioService.obtenerEducacion().subscribe(
      (response: Educacion[]) => {
        this.estudios = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onAgregarEducacion(formulario: NgForm): void {
    // console.log(formulario);
    // console.log(formulario.value)
    this.estudioService.agregarEducacion(formulario.value).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.obtenerEstudios();
        formulario.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        formulario.reset();
      }
    );
  }

  public onActualizarEducacion(educacion: Educacion): void {
    this.estudioService.actualizarEducacion(educacion).subscribe(
      (response: Educacion) => {
        console.log("Actualizado");
        // console.log(response);
        this.obtenerEstudios();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEliminarEducacion(id: number): void {
    this.estudioService.eliminarEducacion(id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerEstudios();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(educacion: Educacion, modo: string) {
    const contenedor = document.getElementById('container-educacion');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarEducacionModal');
    }
    if (modo === 'actualizar') {
      this.editEducacion = educacion;
      boton.setAttribute('data-bs-target', '#actualizarEducacionModal');
    }
    if (modo === 'eliminar') {
      this.deleteEducacion = educacion;
      boton.setAttribute('data-bs-target', '#eliminarEducacionModal');
    }

    contenedor.appendChild(boton);
    boton.click();

  }


}

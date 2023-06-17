import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion';
import { LoginService } from 'src/app/service/authentication/login.service';
import { EducacionService } from 'src/app/service/educacion.service';
//Con FormGroup, indentificamos el formDeCreacion y todo su contenido
//FormBuilder, directiva para formar un grupo de componentes que va dentro del form

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {

  estudios: Educacion[] = [];
  isLogged = false;

  constructor(
    private estudioService: EducacionService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {  }

  educationForm = this.fb.group({
    id: [],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    fechaInicio: [],
    fechaFin: [],
    urlLogoInstitucion: [],
  });


  get nombre() { return this.educationForm.get('nombre'); }
  get descripcion() { return this.educationForm.get('descripcion'); }
  

  
  ngOnInit(): void {
    this.obtenerEstudios();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerEstudios(): void {
    this.estudioService.obtenerEducacion().subscribe(
      (response: Educacion[]) => {
        this.estudios = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarEducacion(): void {
    if (this.educationForm.valid) {
      const educacion = new Educacion(
        this.educationForm.value.id,
        this.educationForm.value.nombre,
        this.educationForm.value.descripcion,
        this.educationForm.value.fechaInicio,
        this.educationForm.value.fechaFin,
        this.educationForm.value.urlLogoInstitucion
      );

      console.log(educacion);

      this.estudioService.agregarEducacion(educacion).subscribe(
        (response: Educacion) => {
          console.log(response);
          this.obtenerEstudios();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.educationForm.markAllAsTouched();
    }
  }

  public onActualizarEducacion(): void {
    if (this.educationForm.valid) {
      const educacion = new Educacion(
        this.educationForm.value.id,
        this.educationForm.value.nombre,
        this.educationForm.value.descripcion,
        this.educationForm.value.fechaInicio,
        this.educationForm.value.fechaFin,
        this.educationForm.value.urlLogoInstitucion
      );

      this.estudioService.actualizarEducacion(educacion).subscribe(
        (response: Educacion) => {
          console.log('Actualizado');
          // console.log(response);
          this.obtenerEstudios();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

      console.log(educacion);
    } else {

    }

    this.resetForm();
  }

  public onEliminarEducacion(): void {
    this.estudioService
      .eliminarEducacion(this.educationForm.value.id)
      .subscribe(
        (response: void) => {
          console.log(response);
          this.obtenerEstudios();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  private setValueForm(educacion: Educacion) {
    this.educationForm.setValue({
      id: educacion.id,
      nombre: educacion.nombre,
      descripcion: educacion.descripcion,
      fechaInicio: educacion.fechaInicio,
      fechaFin: educacion.fechaFin,
      urlLogoInstitucion: educacion.logo,
    });
  }

  public resetForm(){
    this.educationForm.reset();
  }

  public onOpenModal(educacion: Educacion, modo: string) {
    const contenedor = document.getElementById('container-educacion');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarEducacionModal');
      this.resetForm();
    }
    if (modo === 'actualizar') {
      this.setValueForm(educacion);
      boton.setAttribute('data-bs-target', '#actualizarEducacionModal');
    }
    if (modo === 'eliminar') {
      this.setValueForm(educacion); //seteo los valores del formulario
      boton.setAttribute('data-bs-target', '#eliminarEducacionModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }
}

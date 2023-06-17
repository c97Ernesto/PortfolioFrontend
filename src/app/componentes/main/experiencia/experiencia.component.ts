import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { LoginService } from 'src/app/service/authentication/login.service';
import { ExperienciaService } from 'src/app/service/experiencia.service';
//Con FormGroup, indentificamos el formDeCreacion y todo su contenido
//FormBuilder, directiva para formar un grupo de componentes que va dentro del form

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {

  experiencia: Experiencia[] = [];
  isLogged = false;

  constructor(
    private experienciaService: ExperienciaService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {  }

  experienciaForm = this.fb.group({
    id: [],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    fechaInicio: [],
    fechaFin: [],
    logo: [],
  });


  get nombre() { return this.experienciaForm.get('nombre'); }
  get descripcion() { return this.experienciaForm.get('descripcion'); }

  
  ngOnInit(): void {
    this.obtenerExperiencia();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerExperiencia(): void {
    this.experienciaService.obtenerExperiencia().subscribe(
      (response: Experiencia[]) => {
        this.experiencia = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarExperiencia(): void {
    if (this.experienciaForm.valid) {
      const experiencia = new Experiencia(
        this.experienciaForm.value.id,
        this.experienciaForm.value.nombre,
        this.experienciaForm.value.descripcion,
        this.experienciaForm.value.fechaInicio,
        this.experienciaForm.value.fechaFin,
        this.experienciaForm.value.logo
      );

      console.log(experiencia);

      this.experienciaService.agregarExperiencia(experiencia).subscribe(
        (response: Experiencia) => {
          console.log(response);
          this.obtenerExperiencia();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.experienciaForm.markAllAsTouched();
      console.log(this.experienciaForm);
    }
  }

  public onActualizarExperiencia(): void {
    if (this.experienciaForm.valid) {
      const experiencia = new Experiencia(
        this.experienciaForm.value.id,
        this.experienciaForm.value.nombre,
        this.experienciaForm.value.descripcion,
        this.experienciaForm.value.fechaInicio,
        this.experienciaForm.value.fechaFin,
        this.experienciaForm.value.logo
      );

      this.experienciaService.actualizarExperiencia(experiencia).subscribe(
        (response: Experiencia) => {
          console.log('Actualizado');
          // console.log(response);
          this.obtenerExperiencia();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

      console.log(Experiencia);
    } else {
      console.log(this.experienciaForm);
    }

    this.resetForm();
  }

  public onEliminarExperiencia(): void {
    this.experienciaService
      .eliminarExperiencia(this.experienciaForm.value.id)
      .subscribe(
        (response: void) => {
          console.log(response);
          this.obtenerExperiencia();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  private setValueForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({
      id: experiencia.id,
      nombre: experiencia.nombre,
      descripcion: experiencia.descripcion,
      fechaInicio: experiencia.fechaInicio,
      fechaFin: experiencia.fechaFin,
      logo: experiencia.logo,
    });
  }

  public resetForm(){
    this.experienciaForm.reset();
  }

  public onOpenModal(experiencia: Experiencia, modo: string) {
    const contenedor = document.getElementById('container-experiencia');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarExperienciaModal');
      this.resetForm();
    }
    if (modo === 'actualizar') {
      this.setValueForm(experiencia);
      boton.setAttribute('data-bs-target', '#actualizarExperienciaModal');
    }
    if (modo === 'eliminar') {
      this.setValueForm(experiencia); //seteo los valores del formulario
      boton.setAttribute('data-bs-target', '#eliminarExperienciaModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }
}

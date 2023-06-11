import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
proyecto: Proyecto;
  isLogged = false;

  formProyecto: FormGroup;

  // Probar cambiar tipo de instanciación
  constructor(private proyectoService: ProyectoService, private loginService: LoginService, private fb: FormBuilder) { 
    this.formProyecto = this.fb.group({
      id: [],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      linkProyecto: [],
      imagenProyecto: [],
      fechaCreacionProyecto: [],      
    });
  }


  get nombre() { return this.formProyecto.get('nombre'); }
  get descripcion() { return this.formProyecto.get('descripcion'); }

  
  ngOnInit(): void {
    this.obtenerProyecto();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerProyecto(): void {
    this.proyectoService.obtenerProyectos().subscribe(
      (response: Proyecto[]) => {
        this.proyectos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarProyecto(): void {
    if (this.formProyecto.valid) {
      const proyecto = new Proyecto(
        this.formProyecto.value.id,
        this.formProyecto.value.nombre,
        this.formProyecto.value.descripcion,
        this.formProyecto.value.linkProyecto,
        this.formProyecto.value.imagenProyecto,
        this.formProyecto.value.fechaCreacionProyecto
      );

      console.log(proyecto);

      this.proyectoService.agregarProyecto(proyecto).subscribe(
        (response: Proyecto) => {
          console.log(response);
          this.obtenerProyecto();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      console.log(this.formProyecto);
    }

    this.resetForm();
  }

  public onActualizarProyecto(): void {
    if (this.formProyecto.valid) {
      const proyecto = new Proyecto(
        this.formProyecto.value.id,
        this.formProyecto.value.nombre,
        this.formProyecto.value.descripcion,
        this.formProyecto.value.linkProyecto,
        this.formProyecto.value.imagenProyecto,
        this.formProyecto.value.fechaCreacionProyecto
      );

      this.proyectoService.actualizarProyecto(proyecto).subscribe(
        (response: Proyecto) => {
          console.log('Actualizado');
          // console.log(response);
          this.obtenerProyecto();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

      console.log(proyecto);
    } else {

    }

    this.resetForm();
  }

  public onEliminarProyecto(): void {
    this.proyectoService
      .eliminarProyecto(this.formProyecto.value.id)
      .subscribe(
        (response: void) => {
          console.log(response);
          this.obtenerProyecto();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  private setValueForm(proyecto: Proyecto) {
    this.formProyecto.setValue({
      id: proyecto.id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      linkProyecto: proyecto.link,
      imagenProyecto: proyecto.imagen,
      fechaCreacionProyecto: proyecto.fechaCreacion,  
    });
  }

  public resetForm(){
    this.formProyecto.reset();
  }

  public onOpenModal(proyecto: Proyecto, modo: string) {
    const contenedor = document.getElementById('container-proyecto');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarProyectoModal');
      this.resetForm();
    }
    if (modo === 'actualizar') {
      this.setValueForm(proyecto);
      boton.setAttribute('data-bs-target', '#actualizarProyectoModal');
    }
    if (modo === 'eliminar') {
      this.setValueForm(proyecto); //seteo los valores del formulario
      boton.setAttribute('data-bs-target', '#eliminarProyectoModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }
}

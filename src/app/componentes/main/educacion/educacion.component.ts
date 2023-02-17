import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion';
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
  formDeCreacion: FormGroup;

  constructor(
    private estudioService: EducacionService,
    private formBuilder: FormBuilder
  ) {
    this.formDeCreacion = this.formBuilder.group({
      //mismo nombre que la clase Entity
      nombre: ['',[Validators.required]],
      descripcion: '',
    });
  }
  
  ngOnInit(): void {
    this.obtenerEstudios();    
    console.log(this.formDeCreacion);
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

  public onAgregarEmpleado(): void {
   
    
  }

  public onSubmit() {
    console.log(this.formDeCreacion);
    console.log(this.formDeCreacion.value)
    this.estudioService.agregarEducacion(this.formDeCreacion.value).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.obtenerEstudios();
        this.formDeCreacion.reset();
      },(error: HttpErrorResponse) => {
        alert(error.message);
        this.formDeCreacion.reset();
      }
    );
  }

  
}

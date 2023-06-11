import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skill';
import { LoginService } from 'src/app/service/authentication/login.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {

  skills: Skill[] = [];

  formSkill: FormGroup;

  isLogged = false;

  constructor(
    private skillService: SkillService,
    private loginService: LoginService,
    private fb: FormBuilder
  ){ 
    this.formSkill = this.fb.group({
      id: [],
      nombre: ['',[Validators.required]],
      porcentajeHabilidad: ['',[Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  get nombre() {return this.formSkill.get('nombre')}
  get porcentajeHabilidad() {return this.formSkill.get('porcentajeHabilidad')}

  ngOnInit(): void {
    this.obtenerSkill();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerSkill(): void {
    this.skillService.obtenerSkills().subscribe(
      (response: Skill[]) => {
        this.skills = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarSkill(): void {
    if (this.formSkill.valid){
      // instanciar fuera del if
      const skill = new Skill(this.formSkill.value.id, this.formSkill.value.nombre, this.formSkill.value.porcentajeHabilidad);
      this.skillService.agregarSkill(skill).subscribe(
        (response: Skill) => {
          console.log(response);
          this.obtenerSkill();
        }, (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.formSkill.markAllAsTouched();
    }
    this.resetForm();
  }

  public onActualizarSkill(): void {
    if (this.formSkill.valid) {
      // instanciar fuera del if
      const skill = new Skill(this.formSkill.value.id, this.formSkill.value.nombre, this.formSkill.value.porcentajeHabilidad);
      this.skillService.actualizarSkill(skill).subscribe(
        (response: Skill) => {
          console.log("Actualizado");
          // console.log(response);
          this.obtenerSkill();
        }, (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.formSkill.markAllAsTouched();
    }
    this.resetForm();
  }

  public onEliminarSkill(): void {
    this.skillService.eliminarSkill(this.formSkill.value.id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerSkill();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private setValueForm(skill: Skill){
    this.formSkill.setValue({
      id: skill.id,
      nombre: skill.nombre,
      porcentajeHabilidad: skill.porcentaje,
    })
  }

  public resetForm(){
    this.formSkill.reset();
  }

  public onOpenModal(skill: Skill, modo: string) {
    const contenedor = document.getElementById('container-skill');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarSkillModal');
      this.resetForm();
    }
    if (modo === 'actualizar') {
      this.setValueForm(skill);
      boton.setAttribute('data-bs-target', '#actualizarSkillModal');
    }
    if (modo === 'eliminar') {
      this.setValueForm(skill);
      boton.setAttribute('data-bs-target', '#eliminarSkillModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }


}

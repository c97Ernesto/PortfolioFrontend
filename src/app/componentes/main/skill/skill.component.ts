import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  editSkill: Skill;
  deleteSkill: Skill;

  isLogged = false;

  constructor(
    private skillService: SkillService,
    private loginService: LoginService
  ){ }

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

  public onAgregarSkill(formulario: NgForm): void {
    // console.log(formulario);
    // console.log(formulario.value)
    this.skillService.agregarSkill(formulario.value).subscribe(
      (response: Skill) => {
        console.log(response);
        this.obtenerSkill();
        formulario.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        formulario.reset();
      }
    );
  }

  public onActualizarSkill(skill: Skill): void {
    this.skillService.actualizarSkill(skill).subscribe(
      (response: Skill) => {
        console.log("Actualizado");
        // console.log(response);
        this.obtenerSkill();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEliminarSkill(id: number): void {
    this.skillService.eliminarSkill(id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerSkill();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(skill: Skill, modo: string) {
    const contenedor = document.getElementById('container-skill');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarSkillModal');
    }
    if (modo === 'actualizar') {
      this.editSkill = skill;
      boton.setAttribute('data-bs-target', '#actualizarSkillModal');
    }
    if (modo === 'eliminar') {
      this.deleteSkill = skill;
      boton.setAttribute('data-bs-target', '#eliminarSkillModal');
    }

    contenedor.appendChild(boton);
    boton.click();

  }

}

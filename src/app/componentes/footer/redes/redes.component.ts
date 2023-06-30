import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RedSocial } from 'src/app/model/redSocial';
import { LoginService } from 'src/app/service/authentication/login.service';
import { RedSocialService } from 'src/app/service/red-social.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css'],
})
export class RedesComponent {
  redesSociales: RedSocial[] = [];

  formRedSocial: FormGroup;

  showEditIcon: boolean = false;

  isLogged = false;

  constructor(
    private fb: FormBuilder,
    private redSocialService: RedSocialService,
    private loginService: LoginService
  ) {
    this.formRedSocial = this.fb.group({
      id: [],
      nombre: [],
      enlace: [],
      icono: ['',[Validators.required]],
    });
  }

  get nombre() { return this.formRedSocial.get('nombre'); }
  get enlace() { return this.formRedSocial.get('enlace'); }
  get icono() { return this.formRedSocial.get('icono'); }

  ngOnInit(): void {
    this.obtenerRedesSociales();
    this.isLogged = this.loginService.isLoggedIn();
  }

  public obtenerRedesSociales(): void {
    this.redSocialService.obtenerRedSocial().subscribe(
      (response: RedSocial[]) => {
        this.redesSociales = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAgregarRedSocial(): void {
    if (this.formRedSocial.valid) {
      const redSocial = new RedSocial(
        this.formRedSocial.value.id,
        this.formRedSocial.value.nombre,
        this.formRedSocial.value.enlace,
        this.formRedSocial.value.icono
      );

      console.log(redSocial);

      this.redSocialService.agregarRedSocial(redSocial).subscribe(
        (response: RedSocial) => {
          console.log(response);
          this.obtenerRedesSociales();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.formRedSocial.markAllAsTouched();
    }
  }



  public onActualizarRedSocial(): void {
    if (this.formRedSocial.valid) {
      const redSocial = new RedSocial(
        this.formRedSocial.value.id,
        this.formRedSocial.value.nombre,
        this.formRedSocial.value.enlace,
        this.formRedSocial.value.icono
      );

      this.redSocialService.actualizarRedSocial(redSocial).subscribe(
        (response: RedSocial) => {
          console.log('Actualizado');
          // console.log(response);
          this.obtenerRedesSociales();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

      console.log(redSocial);
    } else {
    }

    this.resetForm();
  }

  public onEliminarRedSocial(): void {
    this.redSocialService.eliminarRedSocial(this.formRedSocial.value.id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerRedesSociales();
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private setValueForm(redSocial: RedSocial) {
    this.formRedSocial.setValue({
      id: redSocial.id,
      nombre: redSocial.nombre,
      enlace: redSocial.url,
      icono: redSocial.icono,
    });
  }

  public resetForm() {
    this.formRedSocial.reset();
  }

  public hayElementos(): boolean {
    return this.redesSociales.length > 0;
  }

  public onOpenModal(redSocial: RedSocial, modo: string) {
    const contenedor = document.getElementById('container-redSocial');
    const boton = document.createElement('button');

    boton.type = 'button';
    boton.style.display = 'none';
    boton.setAttribute('data-bs-toggle', 'modal');

    if (modo === 'agregar') {
      boton.setAttribute('data-bs-target', '#agregarRedSocialModal');
      this.resetForm();
    }
    if (modo === 'actualizar') {
      this.setValueForm(redSocial);
      boton.setAttribute('data-bs-target', '#actualizarRedSocialModal');
    }
    // if (modo === 'eliminar') {
    //   this.setValueForm(redSocial); //seteo los valores del formulario
    //   boton.setAttribute('data-bs-target', '#eliminarRedSocialModal');
    // }

    contenedor.appendChild(boton);
    boton.click();
  }
}

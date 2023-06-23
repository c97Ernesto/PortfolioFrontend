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
  form: FormGroup;
  isLogged: boolean = false;

  constructor(
    private fb: FormBuilder,
    private redSocialService: RedSocialService,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      id: [],
      nombre: ['', [Validators.required]],
      enlace: ['', [Validators.required]],
      icono: [],
    });
  }

  get nombre() { return this.form.get('nombre'); }
  get enlace() { return this.form.get('enlace'); }
  get icono() { return this.form.get('icono'); }

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
    if (this.form.valid) {
      const redSocial = new RedSocial(
        this.form.value.id,
        this.form.value.nombre,
        this.form.value.enlace,
        this.form.value.icono
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
      this.form.markAllAsTouched();
    }
  }



  public onActualizarRedSocial(): void {
    if (this.form.valid) {
      const redSocial = new RedSocial(
        this.form.value.id,
        this.form.value.nombre,
        this.form.value.enlace,
        this.form.value.icono
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
    this.redSocialService.eliminarRedSocial(this.form.value.id).subscribe(
      (response: void) => {
        console.log(response);
        this.obtenerRedesSociales();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private setValueForm(redSocial: RedSocial) {
    this.form.setValue({
      id: redSocial.id,
      nombre: redSocial.nombre,
      enlace: redSocial.url,
      icono: redSocial.icono,
    });
  }

  public resetForm() {
    this.form.reset();
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
    if (modo === 'eliminar') {
      this.setValueForm(redSocial); //seteo los valores del formulario
      boton.setAttribute('data-bs-target', '#eliminarRedSocialModal');
    }

    contenedor.appendChild(boton);
    boton.click();
  }
}

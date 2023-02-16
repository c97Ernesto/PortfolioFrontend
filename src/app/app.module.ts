import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MainComponent } from './componentes/main/main.component';
import { PerfilComponent } from './componentes/main/perfil/perfil.component';
import { AcercaDeComponent } from './componentes/main/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/main/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/main/educacion/educacion.component';
//import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PerfilComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    MainComponent,
    //IniciarSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MainComponent } from './componentes/main/main.component';
import { PerfilComponent } from './componentes/main/perfil/perfil.component';
import { AcercaDeComponent } from './componentes/main/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/main/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/main/educacion/educacion.component';
import { LoginComponent } from './page/login/login.component';

import { authInterceptorProviders } from './service/authentication/auth.interceptor';
import { ProyectoComponent } from './componentes/main/proyecto/proyecto.component';
import { SkillComponent } from './componentes/main/skill/skill.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FooterComponent } from './componentes/footer/footer.component';
import { DatePipe } from '@angular/common';
import { RedesComponent } from './componentes/footer/redes/redes.component';
import { PerfilFooterComponent } from './componentes/footer/perfil-footer/perfil-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PerfilComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    MainComponent,
    LoginComponent,
    ProyectoComponent,
    SkillComponent,
    FooterComponent,
    RedesComponent,
    PerfilFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
  ],
  providers: [
    authInterceptorProviders,
    { provide: DatePipe, useClass: DatePipe },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  persona: Persona

  constructor (
    private personaService: PersonaService,
  ) {}

  ngOnInit(): void {
    this.obtenerPersona();
  }

  public obtenerPersona(): void {
    this.personaService.obtenerPersona(1).subscribe(
      (data: Persona) => {
        this.persona = data;
      }, (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  
}

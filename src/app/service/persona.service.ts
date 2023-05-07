import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  // public obtenerPersonas(): Observable<Persona[]> {
  //   return this.httpClient.get<Persona[]>(`${this.apiServerUrl}/persona/listar`);
  // }

  public obtenerPersona(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(`${this.apiServerUrl}/persona/${id}`);
  }
}

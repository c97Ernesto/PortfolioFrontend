import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public obtenerSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`${this.apiServerUrl}/skill/listar`);
  }

  public agregarSkill(skill: Skill): Observable<Skill> {
    return this.httpClient.post<Skill>(`${this.apiServerUrl}/skill/agregar`, skill);
  }

  public actualizarSkill(skill: Skill): Observable<Skill> {
    return this.httpClient.put<Skill>(`${this.apiServerUrl}/skill/actualizar/${skill.id}`, skill);
  }

  public eliminarSkill(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/skill/eliminar/${id}`);
  }

}

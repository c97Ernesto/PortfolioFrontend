import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public obtenerExperiencia(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/listar`);
  }

  public agregarExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.post<Experiencia>(`${this.apiServerUrl}/experiencia/agregar`, experiencia);
  }

  public actualizarExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(`${this.apiServerUrl}/experiencia/actualizar`, experiencia);
  }

  public eliminarExperiencia(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/experiencia/eliminar/${id}`);
  }
}

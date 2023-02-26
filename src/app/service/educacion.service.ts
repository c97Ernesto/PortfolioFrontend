import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Educacion } from '../model/educacion';


@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public obtenerEducacion(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(`${this.apiServerUrl}/educacion/listar`);
  }

  public agregarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.httpClient.post<Educacion>(`${this.apiServerUrl}/educacion/agregar`, educacion);
  }

  public actualizarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.httpClient.put<Educacion>(`${this.apiServerUrl}/educacion/actualizar`, educacion);
  }

  public eliminarEducacion(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/educacion/eliminar/${id}`);
  }
}

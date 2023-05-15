import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../model/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public obtenerProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(`${this.apiServerUrl}/proyecto/listar`);
  }

  public agregarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.httpClient.post<Proyecto>(`${this.apiServerUrl}/proyecto/agregar`, proyecto);
  }

  public actualizarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.httpClient.put<Proyecto>(`${this.apiServerUrl}/proyecto/actualizar/${proyecto.id}`, proyecto);
  }

  public eliminarProyecto(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/proyecto/eliminar/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RedSocial } from '../model/redSocial';

@Injectable({
  providedIn: 'root'
})
export class RedSocialService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public obtenerRedSocial(): Observable<RedSocial[]> {
    return this.httpClient.get<RedSocial[]>(`${this.apiServerUrl}/redSocial/listar`);
  }

  public agregarRedSocial(redSocial: RedSocial): Observable<RedSocial> {
    return this.httpClient.post<RedSocial>(`${this.apiServerUrl}/redSocial/agregar`, redSocial);
  }

  public actualizarRedSocial(redSocial: RedSocial): Observable<RedSocial> {
    return this.httpClient.put<RedSocial>(`${this.apiServerUrl}/redSocial/actualizar/${redSocial.id}`, redSocial);
  }
  
  public eliminarRedSocial(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/redSocial/eliminar/${id}`);
  }
}

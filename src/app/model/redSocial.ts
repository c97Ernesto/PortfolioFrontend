//Réplica del Entity que tenemos en el back
export class RedSocial {
  id?: number; 
  nombre: string;
  url: string;
  icono?: string;

  constructor(id: number, nombre: string, enlace: string, icono: string) {
      this.id = id;
      this.nombre = nombre;
      this.url = enlace;
      this.icono = icono;
  }
  
}

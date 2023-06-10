export class Educacion {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  logo: string;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    fechaInicio: Date,
    fechaFin: Date,
    logo: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.logo = logo;
  }
}

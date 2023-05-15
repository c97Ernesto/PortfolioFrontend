export class Educacion {
   id?: number;
   nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    logo: Date;

    constructor(nombre: string, descripcion: string, fechaInicio: Date, fechaFin: Date, logo: Date) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.logo = logo;
    }
}

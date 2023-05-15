//Réplica del Entity que tenemos en el back
export class Experiencia {
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

//Réplica del Entity que tenemos en el back
export class Experiencia {
    id?: number; 
    nombre: string;
    descripcion: string;

    constructor(nombre: string, descripcion: string) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    
}

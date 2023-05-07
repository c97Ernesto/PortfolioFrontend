export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    descripcion: string;
    imagenUrl: string;

    constructor(nombre: string, apellido: string, descripcion: string, imagen: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.imagenUrl = imagen;
    }
}
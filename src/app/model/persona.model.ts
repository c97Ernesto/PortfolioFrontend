export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    titulo: string;
    sobreMi: string;
    telefono: string;
    email: string;
    imgPerfilUrl: string;
    imgFondo: string;

    constructor(id: number, nombre: string, apellido: string, titulo: string, sobreMi: string, telefono: string,
        email: string, imgPerfilUrl: string, imgFondo: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.imgFondo = imgFondo;
        this.imgPerfilUrl = imgPerfilUrl;
        this.sobreMi = sobreMi;
        this.telefono = telefono;
        this.titulo = titulo;
    }
}
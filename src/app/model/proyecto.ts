//Probar usando los atributos con get y set
export class Proyecto {
  id?: number;
	nombre: string;
	descripcion: string;
	link: string;
	imagen: string;
	fechaCreacion: string;

  constructor (nombre: string, descripcion: string, link: string, imagen: string, fechaCreacion: string) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.link = link;
		this.imagen = imagen;
		this.fechaCreacion = fechaCreacion;
	}


	
}
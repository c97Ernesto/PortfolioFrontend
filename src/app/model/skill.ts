export class Skill {
  id?: number;
  nombre: string
  porcentaje: number;

  constructor (id: number, nombre: string, porcentaje: number) {
    this.id = id
    this.nombre = nombre;
    this.porcentaje = porcentaje;
  }

}
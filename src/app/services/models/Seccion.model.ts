import { Tarjeta } from './Tarjeta.model';
export class Seccion {
    constructor() {}
    public IdSeccion: number;
    public Nombre: string;
    public IdTablero: number;
    public Tarjetas?: Tarjeta[];
}

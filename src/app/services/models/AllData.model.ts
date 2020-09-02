import { Seccion } from './Seccion.model';
import { Tablero } from './Tablero.model';
import { Usuario } from './Usuario.model';
export class AllData{
    constructor(
        public usuario: Usuario,
        public tableros: Tablero[],
        public secciones: Seccion[],
    ) {
    }
}

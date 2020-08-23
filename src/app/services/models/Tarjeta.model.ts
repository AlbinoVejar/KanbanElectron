export class Tarjeta {
    constructor(
        public IdTarjeta: number,
        public Titulo: string,
        public Descripcion: string,
        public NumTareas: number,
        public FechaCrecion: Date,
        public FechaTerminada: Date,
        public Tareas: number[],
        public IdSeccion: number
    ) {}
}

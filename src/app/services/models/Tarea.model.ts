export class Tarea {
    constructor(
        public IdTarea: number,
        public Titulo: string,
        public Realizada: boolean,
        public FechaCreacion: Date,
        public FechaTerminada: Date,
        public IdTarjeta: number
    ) {}
}

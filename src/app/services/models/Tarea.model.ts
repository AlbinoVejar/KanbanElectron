export class Tarea {
    constructor() {}
    public IdTarea: number;
    public Titulo: string;
    public Realiza: number;
    public FechaCreacion: Date;
    public IdTarjeta: number;
    public FechaTerminada?: Date;
    public Tareas?: Tarea[];
}

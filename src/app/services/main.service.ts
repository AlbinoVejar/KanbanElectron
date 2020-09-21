import { ControlService } from './control.service';
import { Tarea } from './models/Tarea.model';
import { Tarjeta } from './models/Tarjeta.model';
import { iUsuario } from './interfaces/iUsuario';
import { Seccion } from './models/Seccion.model';
import { Tablero } from './models/Tablero.model';
import { Usuario } from './models/Usuario.model';
import { AllData } from './models/AllData.model';
import { Injectable } from '@angular/core';

enum Sql {
  GetOne = 'getOne',
  GetAll = 'getAll',
  Insert = 'insert',
  Update = 'update',
  Delete = 'delete'
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  allData: AllData;
  public usuario: Usuario;
  public tableroSeleccionado: number;
  constructor(
    private service: ControlService
  ){
    this.getAllUsuario().then((data) => {});
  }
  private getRenderScript(script): string{
    switch (script) {
      case 'getOne': return 'setOne';
      case 'getAll': return 'setAll';
      case 'insert': return 'inserted';
      case 'update': return 'updated';
      case 'delete': return 'deleted';
    }
  }
  public setSelectTablero(idTablero: number): void{
    this.tableroSeleccionado = idTablero;
  }
  public get getUsuario(): number{
    return this.usuario.IdUsuario;
  }
  public async getAllUsuario(): Promise<any>{
    const data: iUsuario = await this.service.getUsuarioSQL();
    this.usuario = new Usuario(data.IdUsuario, data.Nombre);
  }
  public async getAllTableros(idUsuario: number): Promise<any>{
    const tableros: Tablero[] = [];
    const data = await this.service.getTablerosSQL(idUsuario);
    for (const tablero of data) {
      tableros.push(Object.assign(new Tablero(), tablero));
    }
    return tableros;
  }
  public async getAllSecciones(idTablero: number): Promise<any>{
    const secciones: Seccion[] = [];
    const data = await this.service.getSeccionesSQL(idTablero);
    for (const seccion of data) {
      const item: Seccion = Object.assign(new Seccion(), seccion);
      item.Tarjetas = await this.getAllTarjetas(item.IdSeccion);
      secciones.push(item);
    }
    return secciones;
  }
  public async getAllTarjetas(idSeccion: number): Promise<any>{
    const tarjetas: Tarjeta[] = [];
    const items = await this.service.getTarjetasSQL(idSeccion);
    for (const tarjeta of items) {
      tarjetas.push(Object.assign(new Tarjeta(), tarjeta));
    }
    return tarjetas;
  }
  public async getAllTareas(idTarjeta: number): Promise<any>{
    const tareas: Tarea[] = [];
    const items = await this.service.getTareasSQL(idTarjeta);
    if (items){
      for (const tarea of items) {
        tareas.push(Object.assign(new Tarea(), tarea));
      }
    }
    return tareas;
  }

  // public insert
  public async NuevoTablero(nombre: string): Promise<any>{
    return await this.service.insertTableroSQL(nombre, this.tableroSeleccionado  );
  }
  public async NuevaSeccion(titulo: string): Promise<any>{
    return await this.service.insertSeccionSQL(titulo, this.tableroSeleccionado);
  }
  public async NuevaTarjeta(titulo: string, idSeccion: number): Promise<any>{
    return await this.service.insertTarjetaSQL(titulo, idSeccion);
  }
  public async NuevaTarea(titulo: string, idTarjeta: number): Promise<any>{
    return await this.service.insertTareaSQL(titulo, idTarjeta);
  }
  // public update
  public async ActualizarTablero(idTablero: number, titulo: string): Promise<any>{
    return await this.service.updateTableroSQL(idTablero, titulo);
  }
  public async ActualizarSeccion(idSeccion: number, titulo: string): Promise<any>{
    return await this.service.updateSeccionSQL(idSeccion, titulo);
  }
  public async ActualizarTarjetaAllParams(idTarjeta: number, titulo: string, descripcion: string, idSeccion: number): Promise<any>{
    return await this.service.updateTarjetaAllParamsSQL(idTarjeta, titulo, descripcion, idSeccion);
  }
  public async ActualizarTarjetaDescripcion(idTarjeta: number, descripcion: string): Promise<any>{
    return await this.service.updateTarjetaDescripcionSQL(idTarjeta, descripcion);
  }
  public async ActualizarTarjetaTitulo(idTarjeta: number, titulo: string): Promise<any>{
    return await this.service.updateTarjetaTituloSQL(idTarjeta, titulo);
  }
  public async ActualizarTarjetaIdSeccion(idTarjeta: number, idSeccion: number): Promise<any>{
    return await this.service.updateTarjetaIdSeccionSQL(idTarjeta, idSeccion);
  }
  public async ActualizarTareaCheck(idTarea: number, check: number): Promise<any>{
    return await this.service.updateTareaCheckSQL(idTarea, check);
  }
  public async ActualizarTareaTitulo(idTarea: number, titulo: string): Promise<any>{
    return await this.service.updateTareaTituloSQL(idTarea, titulo);
  }
  // public DELETE
  public async EliminarTablero(idTablero: number): Promise<any>{
    return await this.service.deleteTableroSQL(idTablero);
  }
  public async EliminarSeccion(idSeccion: number): Promise<any>{
    return await this.service.deleteSeccionSQL(idSeccion);
  }
  public async EliminarTarjeta(idTarjeta: number): Promise<any>{
    return await this.service.deleteTarjetaSQL(idTarjeta);
  }
  public async EliminarTarea(idTarea: number): Promise<any>{
    return await this.service.deleteTareaSQL(idTarea);
  }
}

import { Tarjeta } from './models/Tarjeta.model';
import { iTablero } from './interfaces/iTablero';
import { iUsuario } from './interfaces/iUsuario';
import { Seccion } from './models/Seccion.model';
import { Tablero } from './models/Tablero.model';
import { Usuario } from './models/Usuario.model';
import { AllData } from './models/AllData.model';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

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
    private electronS: ElectronService,
  ){
    this.getAllUsuario().then((data) => {});
    // this.onOpen();
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
  public get getSelectTablero(): number{
    return this.tableroSeleccionado;
  }
  public setSelectTablero(idTablero: number): void{
    this.tableroSeleccionado = idTablero;
  }
  public get getUsuario(): number{
    return this.usuario.IdUsuario;
  }
  public async getAllUsuario(){
    const data: iUsuario = await this.getUsuarioSQL();
    this.usuario = new Usuario(data.IdUsuario, data.Nombre);
  }
  public async getAllTableros(idUsuario: number){
    const tableros: Tablero[] = [];
    const data = await this.getTablerosSQL(idUsuario);
    for (const tablero of data) {
      tableros.push(Object.assign(new Tablero(), tablero));
    }
    return tableros;
  }
  public async getAllSecciones(idTablero: number){
    const secciones: Seccion[] = [];
    const data = await this.getSeccionesSQL(idTablero);
    for (const seccion of data) {
      secciones.push(Object.assign(new Seccion(), seccion));
    }
    return secciones;
  }
  public async getAllTarjetas(idSeccion: number){
    const tarjetas: Tarjeta[] = [];
    const data = await this.getTarjetasSQL(idSeccion);
    for (const tarjeta of data) {
      tarjetas.push(Object.assign(new Tarjeta(), tarjeta));
    }
    return tarjetas;
  }
  // Privates
  private getFechaNow(): string{
    return `(SELECT strftime('%d-%m-%Y','now'))`;
  }
  private async runScript(script: string, query: string){
    return await this.electronS.ipcRenderer.invoke(script, query);
  }
  private async getUsuarioSQL(){
    const query = 'SELECT * FROM Usuarios;';
    return await this.runScript(Sql.GetOne, query);
    // return Object.assign(new Usuario(), data);
  }
  private async getTablerosSQL(idUsuario: number){
    const query = `SELECT * FROM Tableros WHERE IdUsuario = ${idUsuario}`;
    return await this.runScript(Sql.GetAll, query);
  }
  private async getSeccionesSQL(idTablero: number){
    const query = `SELECT * FROM Secciones WHERE IdTablero = ${idTablero}`;
    return await this.runScript(Sql.GetAll, query);
  }
  private async getTarjetasSQL(idSeccion: number){
    const query = `SELECT * FROM Tarjetas WHERE IdSeccion = ${idSeccion}`;
    return await this.runScript(Sql.GetAll, query);
  }
  private async getTareasSQL(idTarjeta: number){
    const query = `SELECT * FROM Tareas WHERE IdTarjeta = ${idTarjeta}`;
    const data = await this.runScript(Sql.GetAll, query);
    console.log(data);
  }

  //public insert
  public NuevoTablero(nombre: string): any{
    this.insertTableroSQL(nombre).then( (data) => {
    });
  }
  //INSERT
  private async insertTableroSQL(titulo: string){
    const query = `INSERT INTO Tableros(Titulo, FechaCreacion, IdUsuario) VALUES('${titulo}','${this.getFechaNow}',${this.usuario.IdUsuario})`;
    const idTablero = await this.runScript(Sql.Insert, query);
    return idTablero;
  }
  public async insertSeccionSQL(titulo: string){
    const query = `INSERT INTO Secciones(Titulo, IdTablero) VALUES('${titulo}', ${this.tableroSeleccionado});`;
    const idSeccion = await this.runScript(Sql.Insert, query);
    return idSeccion;
  }
}

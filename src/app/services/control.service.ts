import { ElectronService } from 'ngx-electron';
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
export class ControlService {

  constructor(
    private electron: ElectronService
  ) { }

  private getRenderScript(script): string{
    switch (script) {
      case 'getOne': return 'setOne';
      case 'getAll': return 'setAll';
      case 'insert': return 'inserted';
      case 'update': return 'updated';
      case 'delete': return 'deleted';
    }
  }

  private getFechaNow(): string{
    return `(SELECT strftime('%d-%m-%Y','now'))`;
  }
  private async runScript(script: string, query: string): Promise<any>{
    return await this.electron.ipcRenderer.invoke(script, query);
  }
  public async getUsuarioSQL(){
    const query = 'SELECT * FROM Usuarios;';
    return await this.runScript(Sql.GetOne, query);
    // return Object.assign(new Usuario(), data);
  }
  public async getTablerosSQL(idUsuario: number){
    const query = `SELECT * FROM Tableros WHERE IdUsuario = ${idUsuario};`;
    return await this.runScript(Sql.GetAll, query);
  }
  public async getSeccionesSQL(idTablero: number){
    const query = `SELECT * FROM Secciones WHERE IdTablero = ${idTablero};`;
    return await this.runScript(Sql.GetAll, query);
  }
  public async getTarjetasSQL(idSeccion: number){
    const query = `SELECT * FROM Tarjetas WHERE IdSeccion = ${idSeccion};`;
    return await this.runScript(Sql.GetAll, query);
  }
  public async getTareasSQL(idTarjeta: number){
    const query = `SELECT * FROM Tareas WHERE IdTarjeta = ${idTarjeta};`;
    return await this.runScript(Sql.GetAll, query);
  }
  // INSERT
  public async insertTableroSQL(titulo: string, idUsuario: number): Promise<any>{
    const query = `INSERT INTO Tableros(Titulo, FechaCreacion, IdUsuario) VALUES('${titulo}','${this.getFechaNow}',${idUsuario})`;
    return await this.runScript(Sql.Insert, query);
  }
  public async insertSeccionSQL(titulo: string, idTablero: number): Promise<any>{
    const query = `INSERT INTO Secciones(Titulo, IdTablero) VALUES('${titulo}', ${idTablero});`;
    return await this.runScript(Sql.Insert, query);
  }
  public async insertTarjetaSQL(titulo: string, idSeccion: number): Promise<any>{
    const query = `INSERT INTO Tarjetas(Titulo, FechaCreacion, IdSeccion) VALUES('${titulo}', ${this.getFechaNow()}, ${idSeccion});`;
    return await this.runScript(Sql.Insert, query);
  }
  public async insertTareaSQL(titulo: string, idTarjeta: number): Promise<any>{
    const query = `INSERT INTO Tareas(Titulo, FechaCreacion, IdTarjeta) VALUES('${titulo}', ${this.getFechaNow()}, ${idTarjeta});`;
    return await this.runScript(Sql.Insert, query);
  }
  // UPDATES
  public async updateTableroSQL(idTablero: number, titulo: string): Promise<any>{
    const query = `UPDATE  Tableros SET Titulo = '${titulo}' WHERE IdTablero = ${idTablero};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateSeccionSQL(idSeccion: number, titulo: string): Promise<any>{
    const query = `UPDATE  Secciones SET Titulo = '${titulo}' WHERE IdSeccion = ${idSeccion};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateTarjetaAllParamsSQL(idTarjeta: number, titulo: string, descripcion: string, idSeccion: number): Promise<any>{
    const query = `UPDATE Tarjetas SET Titulo = '${titulo}', Descripcion = '${descripcion}', IdSeccion = ${idSeccion} WHERE IdTarjeta = ${idTarjeta};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateTarjetaDescripcionSQL(idTarjeta: number, descripcion: string): Promise<any>{
    const query = `UPDATE Tarjetas SET Descripcion = '${descripcion}' WHERE IdTarjeta = ${idTarjeta};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateTarjetaTituloSQL(idTarjeta: number, titulo: string): Promise<any>{
    const query = `UPDATE Tarjetas SET Titulo = '${titulo}' WHERE IdTarjeta = ${idTarjeta};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateTarjetaIdSeccionSQL(idTarjeta: number, idSeccion: number): Promise<any>{
    const query = `UPDATE Tarjetas SET IdSeccion = ${idSeccion} WHERE IdTarjeta = ${idTarjeta};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateTareaCheckSQL(idTarea: number, check: number): Promise<any>{
    const query = `UPDATE Tareas SET Realiza = ${check} WHERE IdTarea = ${idTarea};`;
    return await this.runScript(Sql.Update, query);
  }
  public async updateTareaTituloSQL(idTarea: number, titulo: string): Promise<any>{
    const query = `UPDATE Tareas SET Titulo = '${titulo}' WHERE IdTarea = ${idTarea};`;
    return await this.runScript(Sql.Update, query);
  }
  // DELETE
  public async deleteTableroSQL(idTablero: number): Promise<any>{
    const query = `DELETE FROM Tableros WHERE IdTablero = ${idTablero};`;
    return await this.runScript(Sql.Delete, query);
  }
  public async deleteSeccionSQL(idSeccion: number): Promise<any>{
    const query = `DELETE FROM Secciones WHERE IdSeccion = ${idSeccion};`;
    return await this.runScript(Sql.Delete, query);
  }
  public async deleteTarjetaSQL(idTarjeta: number): Promise<any>{
    const query = `DELETE FROM Tarjetas WHERE IdTarjeta = ${idTarjeta};`;
    return await this.runScript(Sql.Delete, query);
  }
  public async deleteTareaSQL(idTarea: number): Promise<any>{
    const query = `DELETE FROM Tareas WHERE IdTarea = ${idTarea};`;
    return await this.runScript(Sql.Delete, query);
  }
}

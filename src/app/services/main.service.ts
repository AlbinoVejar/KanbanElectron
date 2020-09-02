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
  constructor(
    private electronS: ElectronService,
  ){
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
  private async runScript(script: string, query: string){
    return await this.electronS.ipcRenderer.invoke(script, query);
  }
  public async getAllTableros(){
    const data = await this.runScript(Sql.GetOne, 'SELECT * FROM Usuarios;');
  }
}

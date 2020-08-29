import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpClient } from '@angular/common/http';
// import * as sqlite3 from 'sqlite3';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(
    private electronS: ElectronService,
    private http: HttpClient,
  ) {
    this.electronS.ipcRenderer.send('hola');
    this.electronS.ipcRenderer.on('adios', (event, args) => {
      console.log(args);
    });
  }
}

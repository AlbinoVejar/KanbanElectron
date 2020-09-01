import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(
    private electronS: ElectronService,
  ){
  }
}

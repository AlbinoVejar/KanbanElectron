import { MainService } from './main.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(
    private main: MainService
  ) { }

  public getSelectTablero(): number{
    return this.main.getSelectTablero;
  }
}

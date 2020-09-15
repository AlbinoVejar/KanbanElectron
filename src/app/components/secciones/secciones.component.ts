import { ControlService } from './../../services/control.service';
import { Seccion } from './../../services/models/Seccion.model';
import { HttpClient } from '@angular/common/http';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  mainPage: FormGroup;
  showInputName: boolean;
  showInputTarjeta: boolean;
  showInputNuevaSeccion: boolean;
  secciones: Seccion[] = [];
  selectTablero: number;
  constructor(
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.crearFormulario();
    this.showInputName = false;
    this.showInputTarjeta = false;
    this.showInputNuevaSeccion = false;
    // this.selectTablero = this;
    this.service.getAllSecciones(1).then((data) => {
      this.secciones = data;
      this.selectTablero = this.service.getSelectTablero;
    });
  }
  ngOnInit(): void {
  }
  public crearFormulario(): void{
    this.mainPage = this.fb.group({
      tituloSeccion: [''],
      tituloTarjeta: ['']
    });
  }
  private resetForm(): void{
    this.mainPage.reset();
  }
  get tituloSeccion(): string{
    return this.mainPage.get('tituloSeccion').value;
  }
  public cambiarNombre(): void{
    this.showInputName = !this.showInputName;
  }
  public guardar(): void{
    // console.log(this.tituloSeccion);
    // this.mainPage.reset();
  }
  public nuevaTarjeta(): void{
    this.showInputTarjeta = !this.showInputTarjeta;
  }
  public guardarTarjeta(): void{
    this.nuevaTarjeta();
    this.resetForm();
  }
  public NuevaSeccion(): void{
    this.showInputNuevaSeccion = !this.showInputNuevaSeccion;
  }
  public GuardarNuevaSeccion(): void{
    this.service.insertSeccionSQL(this.tituloSeccion);
  }
  public cambiarSecciones(id: number){
    this.selectTablero = id;
    this.secciones = [];
    this.service.getAllSecciones(this.selectTablero).then((data) => {
      this.secciones = data;
      this.service.setSelectTablero(this.selectTablero);
    });
  }
}

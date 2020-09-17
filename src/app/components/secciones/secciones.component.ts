import { Tarjeta } from './../../services/models/Tarjeta.model';
import { TarjetasComponent } from './../tarjetas/tarjetas.component';
import { Seccion } from './../../services/models/Seccion.model';
import { MainService } from './../../services/main.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  @ViewChild(TarjetasComponent)
  private tarjetaComponent: TarjetasComponent;
  mainPage: FormGroup;
  showInputName: boolean;
  showInputTarjeta: boolean;
  showInputNuevaSeccion: boolean;
  secciones: Seccion[] = [];
  tarjetas: Tarjeta[] = [];
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
  get getTituloSeccion(): string{
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
    this.service.NuevaSeccion(this.tituloSeccion);
  }
  public cambiarSecciones(id: number){
    this.selectTablero = id;
    this.secciones = [];
    this.service.getAllSecciones(this.selectTablero).then((data) => {
      this.secciones = data;
      // this.cargarTarjetas().then((data) => {});
      this.service.setSelectTablero(this.selectTablero);
    });
  }
  private async cargarTarjetas(){
    const tarjetas = [];
    for (const seccion of this.secciones) {
      const data = await this.service.getAllTarjetas(seccion.IdSeccion);
      seccion.Tarjetas = data;
    }
  }
}

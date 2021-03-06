import { Tarjeta } from './../../services/models/Tarjeta.model';
import { TarjetasComponent } from './../tarjetas/tarjetas.component';
import { Seccion } from './../../services/models/Seccion.model';
import { MainService } from './../../services/main.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CdkDragDrop, CdkDragEnter, CdkDragMove, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  selectSeccion: number;
  selectTarjetaDrag: number;
  secciones: Seccion[] = [];
  tarjetas: Tarjeta[] = [];
  selectTablero: number;
  constructor(
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.crearFormulario();
    this.service.getTableroSeleccionado().then((data) => {
      this.selectTablero = data;
      this.service.getAllSecciones(this.selectTablero).then((secciones) => {
        this.secciones = secciones;
      });
    });
    this.showInputName = false;
    this.showInputTarjeta = false;
    this.showInputNuevaSeccion = false;
  }
  ngOnInit(): void {}
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
  get getTituloTarjeta(): string{
    return this.mainPage.get('tituloTarjeta').value;
  }
  public cambiarNombre(): void{
    this.showInputName = !this.showInputName;
  }
  public nuevaTarjeta(seccion: number): void{
    this.selectSeccion = seccion;
    this.showInputTarjeta = !this.showInputTarjeta;
    this.tarjetaComponent.showNuevaTarjeta = true;
  }
  public resetSecciones(): void{
    this.secciones = [];
    this.service.getAllSecciones(this.selectTablero).then((data) => {
      this.secciones = data;
    });
  }
  public NuevaSeccion(): void{
    this.showInputNuevaSeccion = !this.showInputNuevaSeccion;
  }
  public GuardarNuevaSeccion(): void{
    this.service.NuevaSeccion(this.getTituloSeccion, this.selectTablero).then(() => {
      this.NuevaSeccion();
      this.resetSecciones();
      this.resetForm();
    });
  }
  public cambiarSecciones(id: number): void{
    this.selectTablero = id;
    this.secciones = [];
    this.service.getAllSecciones(this.selectTablero).then((data) => {
      this.secciones = data;
    });
  }
  public cargarTarjetas(idSeccion: number): void{
    for (const seccion of this.secciones) {
      if (seccion.IdSeccion === idSeccion){
        this.service.getAllTarjetas(seccion.IdSeccion).then((data) => {
          seccion.Tarjetas = data;
        });
      }
    }
  }
  public dropTarjeta(event: CdkDragDrop<Seccion>): void{
    if (event.previousContainer === event.container){
      console.log(event.container.data);
      console.log(event.previousContainer.data);
    }else {
      const idSeccionNew = event.container.data;
      this.service.ActualizarTarjetaIdSeccion(this.selectTarjetaDrag, idSeccionNew.IdSeccion);
      this.resetSecciones();
    }
  }
  public dragTarjeta(event: CdkDragMove<Tarjeta>): void{
    this.selectTarjetaDrag = event.source.data.IdTarjeta;
  }
}

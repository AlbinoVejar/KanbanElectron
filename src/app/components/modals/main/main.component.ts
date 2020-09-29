import { FormControl } from '@angular/forms';
import { MainService } from './../../../services/main.service';
import { Tarjeta } from './../../../services/models/Tarjeta.model';
import { TarjetasComponent } from './../../tarjetas/tarjetas.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tarjeta: Tarjeta;
  descripcion = new FormControl('');
  nuevaTarea = new FormControl('');
  showDescripcion: boolean;
  showNuevaTarea: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tarjeta,
    private server: MainService
  ) {
    this.showDescripcion = false;
    this.showNuevaTarea = false;
    this.tarjeta = data;
    this.server.getAllTareas(this.tarjeta.IdTarjeta).then((data) => {
      this.tarjeta.Tareas = data;
    });
  }

  ngOnInit(): void {
  }
  public get getDescripcionValue(): string{
    return this.descripcion.value;
  }
  public get getNuevaTareaValue(): string{
    return this.nuevaTarea.value;
  }
  public controlDescripcion(): void{
    this.showDescripcion = !this.showDescripcion;
  }
  public guardarDescripcion(): void{
    this.tarjeta.Descripcion = this.getDescripcionValue;
    this.server.ActualizarTarjetaDescripcion(this.tarjeta.IdTarjeta, this.getDescripcionValue);
    this.controlDescripcion();
  }
  public resetTareas(): void{
    this.server.getAllTareas(this.tarjeta.IdTarjeta).then((data) => {
      this.tarjeta.Tareas = data;
    });
  }
  public controlNuevaTarea(): void{
    this.showNuevaTarea = !this.showNuevaTarea;
  }
  public crearTarea(): void{
    this.server.NuevaTarea(this.getNuevaTareaValue, this.tarjeta.IdTarjeta);
    this.resetTareas();
    this.controlNuevaTarea();
  }
}

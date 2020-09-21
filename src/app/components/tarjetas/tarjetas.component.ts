import { ConfirmComponent } from './../modals/confirm/confirm.component';
import { MainService } from './../../services/main.service';
import { Tarjeta } from './../../services/models/Tarjeta.model';
import { MainComponent } from './../modals/main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  @Input() allTarjetas: Tarjeta[];
  @Input() idSeccion: number;
  showInputTarjeta: boolean;
  mainPage: FormGroup;
  titulo: string;
  selectTarjeta: number;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.selectTarjeta = 0;
    this.crearFormulario();
    this.showInputTarjeta = false;
  }

  ngOnInit(): void {
  }
  private get getTitulo(){
    return this.mainPage.get('titulo').value;
  }
  public crearFormulario(): void{
    this.mainPage = this.fb.group({
      titulo: ['']
    });
  }
  public nuevaTarjeta(show: boolean): void{
    if (!this.showInputTarjeta){
      this.showInputTarjeta = show;
    }else{
      this.showInputTarjeta = false;
    }
  }
  public guardarTarjeta(): void{
    // this.nuevaTarjeta();
    this.service.NuevaTarjeta(this.getTitulo, this.idSeccion);
    // this.resetForm();
  }
  public eliminarTarjeta(id: number): void{
    // this.service.EliminarTarjeta(id);
  }
  public mostrarDialogo(tarjeta: Tarjeta): void{
    this.dialog.open(MainComponent, {
      width: '900px',
      height: '600px',
      data: tarjeta
    });
  }
  public mostrarConfirmacion(id: number): void{
    this.dialog.open(ConfirmComponent, {data: id});
  }

}

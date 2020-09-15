import { Tarjeta } from './../../services/models/Tarjeta.model';
import { MainComponent } from './../modals/main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  @Input() tarjeta: Tarjeta;
  titulo: string;
  constructor(
    public dialog: MatDialog,
  ) {
    this.titulo = 'Titulo de prueba';
  }

  ngOnInit(): void {
  }
  public hola(): void{
    this.dialog.open(MainComponent, {
      width: '900px',
      height: '600px',
      data: {titulo: this.titulo}
    });
  }

}

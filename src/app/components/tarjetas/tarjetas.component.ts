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
  }

  ngOnInit(): void {
  }
  public mostrarDialogo(): void{
    this.dialog.open(MainComponent, {
      width: '900px',
      height: '600px',
      data: {tarjeta: this.tarjeta}
    });
  }

}

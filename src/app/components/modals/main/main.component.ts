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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tarjeta,
    private server: MainService
  ) {
    this.tarjeta = data;
    this.server.getAllTareas(this.tarjeta.IdTarjeta).then((data) => {
      this.tarjeta.Tareas = data;
    });
  }

  ngOnInit(): void {
  }

}

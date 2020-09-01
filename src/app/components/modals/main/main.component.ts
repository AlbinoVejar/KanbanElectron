import { TarjetasComponent } from './../../tarjetas/tarjetas.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  titulo: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TarjetasComponent
  ) {
    this.titulo = data.titulo;
  }

  ngOnInit(): void {
  }

}

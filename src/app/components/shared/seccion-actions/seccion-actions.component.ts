import { MainService } from './../../../services/main.service';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seccion-actions',
  templateUrl: './seccion-actions.component.html',
  styleUrls: ['./seccion-actions.component.css']
})
export class SeccionActionsComponent implements OnInit {
  @Output() tituloNuevaTarjeta = new EventEmitter<number>();
  @Input() idSeccion: number;
  showInputNuevaTarjeta: boolean;
  tituloTarjeta = new FormControl('');
  constructor(
    private service: MainService
  ) {
    this.showInputNuevaTarjeta = false;
  }

  ngOnInit(): void {
  }
  get getTituloTarjeta(): string{
    return this.tituloTarjeta.value;
  }
  public nuevaTarjeta(): void{
    this.showInputNuevaTarjeta = !this.showInputNuevaTarjeta;
  }
  public guardarTarjeta(): void{
    console.log(this.idSeccion);
    if (!this.tituloTarjeta.untouched){
      this.service.NuevaTarjeta(this.getTituloTarjeta, this.idSeccion);
      this.tituloNuevaTarjeta.emit(this.idSeccion);
    }
  }
}

import { ConfirmComponent } from './../../modals/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Seccion } from './../../../services/models/Seccion.model';
import { MainService } from './../../../services/main.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-seccion-header',
  templateUrl: './seccion-header.component.html',
  styleUrls: ['./seccion-header.component.css']
})
export class SeccionHeaderComponent implements OnInit {
  @Output() showNuevaTarjeta = new EventEmitter<number>();
  @Output() actualizarSecciones = new EventEmitter<void>();
  @Input() seccion: Seccion;
  showInputName: boolean;
  tituloSeccion = new FormControl('');
  constructor(
    private service: MainService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.showInputName = false;
  }

  ngOnInit(): void {
  }
  get getTituloSeccion(): string{
    return this.tituloSeccion.value;
  }
  public cambiarNombre(): void{
    this.showInputName = !this.showInputName;
  }
  public nuevaTarjeta(): void{
    this.showNuevaTarjeta.emit(this.seccion.IdSeccion);
  }
  public actualizarNombre(): void{
    this.service.ActualizarSeccion(this.seccion.IdSeccion, this.getTituloSeccion);
    this.cambiarNombre();
    this.actualizarSecciones.emit();
  }
  public eliminarSeccion(): void{
    const resultDialog = this.dialog.open(ConfirmComponent);
    resultDialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm){
        const tarjetas = this.seccion.Tarjetas;
        for (const tarjeta of tarjetas) {
          this.service.ActualizarTarjetaIdSeccion(tarjeta.IdTarjeta, 0);
        }
        this.service.EliminarSeccion(this.seccion.IdSeccion);
      }
      this.actualizarSecciones.emit();
    });
  }
}

import { ConfirmComponent } from './../modals/confirm/confirm.component';
import { MainService } from './../../services/main.service';
import { Tarjeta } from './../../services/models/Tarjeta.model';
import { MainComponent } from './../modals/main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  @Input() tarjeta: Tarjeta;
  @Input() idSeccion: number;
  showInputTarjeta: boolean;
  mainPage: FormGroup;
  tituloNuevo = new FormControl('');
  titulo: string;
  selectTarjeta: number;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.selectTarjeta = 0;
    this.showInputTarjeta = false;
  }

  ngOnInit(): void {
  }
  private get getTitulo(){
    return this.tituloNuevo.value;
  }
  public crearFormulario(): void{
    this.mainPage = this.fb.group({
      titulo: ['']
    });
  }
  public editarTarjeta(): void{
    this.showInputTarjeta = !this.showInputTarjeta;
  }
  public guardarCambios(): void{
    this.service.ActualizarTarjetaTitulo(this.tarjeta.IdTarjeta, this.getTitulo);
  }
  public mostrarDialogo(tarjeta: Tarjeta): void{
    this.dialog.open(MainComponent, {
      width: '900px',
      height: '600px',
      data: tarjeta
    });
  }
  public mostrarConfirmacion(): void{
    const dialog = this.dialog.open(ConfirmComponent);
    dialog.afterClosed().subscribe(confirm => {
      if (confirm){
        const tareas = this.tarjeta.Tareas;
        for (const tarea of tareas) {
          this.service.EliminarTarea(tarea.IdTarea);
        }
        this.service.EliminarTarjeta(this.tarjeta.IdTarjeta);
      }
    });
  }

}

import { ConfirmComponent } from './../modals/confirm/confirm.component';
import { MainService } from './../../services/main.service';
import { Tarjeta } from './../../services/models/Tarjeta.model';
import { MainComponent } from './../modals/main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  @Output() resetTarjetas = new EventEmitter<number>();
  @Input() tarjeta: Tarjeta;
  @Input() idSeccion: number;
  showInputTarjeta: boolean;
  showNuevaTarjeta: boolean;
  overTimerTarjeta: boolean;
  mainPage: FormGroup;
  tituloNuevo = new FormControl('');
  tituloTarjeta = new FormControl('');
  titulo: string;
  selectTarjeta: number;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.selectTarjeta = 0;
    this.showInputTarjeta = false;
    this.showNuevaTarjeta = false;
    this.overTimerTarjeta = false;
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
    this.tituloNuevo.setValue(this.tarjeta.Titulo);
  }
  public guardarCambios(): void{
    this.service.ActualizarTarjetaTitulo(this.tarjeta.IdTarjeta, this.getTitulo);
    this.resetTarjetas.emit(this.idSeccion);
    this.tituloNuevo.reset();
  }
  public mostrarDialogo(tarjeta: Tarjeta): void{
    if (this.overTimerTarjeta){
      this.editarTarjeta();
    }else {
      this.dialog.open(MainComponent, {
        width: '900px',
        height: '600px',
        data: tarjeta
      });
    }
  }
  public overTarjeta(): void{
    this.overTimerTarjeta = false;
    let coutdown = setInterval(() => {
      this.overTimerTarjeta = true;
      clearInterval(coutdown);
    }, 2000);
  }
  public mostrarConfirmacion(): void{
    const dialog = this.dialog.open(ConfirmComponent);
    dialog.afterClosed().subscribe(confirm => {
      if (confirm){
        const tareas = this.tarjeta.Tareas;
        if (tareas){
          for (const tarea of tareas) {
            this.service.EliminarTarea(tarea.IdTarea);
          }
        }
        console.log(this.tarjeta.IdTarjeta);
        this.service.EliminarTarjeta(this.tarjeta.IdTarjeta).then(() => {
          this.resetTarjetas.emit(this.idSeccion);
        });
      }
    });
  }
}

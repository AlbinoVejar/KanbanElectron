import { MainService } from './../../services/main.service';
import { Tarea } from './../../services/models/Tarea.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  @Input() tarea: Tarea;
  @Input() idTarjeta: number;
  nuevaDescripcion = new FormControl('');
  completed = new FormControl('');
  nuevaTarea: boolean;
  showLabel: boolean;
  diasabledButton: boolean;
  constructor(
    private service: MainService
  ) {
    this.showLabel = true;
    this.nuevaTarea = false;
    this.diasabledButton = false;
    if (this.tarea){
      this.completed.setValue(this.tarea.Realizada);
    }
  }

  ngOnInit(): void {
  }

  // Gets
  public get getTitulo(): string{
    return this.nuevaDescripcion.value;
  }
  public getCompletado(): number{
    if (this.completed.value === true){
      return 1;
    }else {
      return 0;
    }
  }
  public hiddenLabel(): void{
    this.showLabel = !this.showLabel;
  }
  public showNuevaTarea(): void{
    this.nuevaTarea = !this.nuevaTarea;
    this.diasabledButton = !this.diasabledButton;
  }
  public eliminarTarea(): void{
    this.service.EliminarTarea(this.tarea.IdTarea);
  }
  public crearTarea($event): void{
    $event.preventDefault();
    this.service.NuevaTarea(this.getTitulo, this.idTarjeta).then((data) => {console.log(data); });
  }
  public actualizarTarea(): void{
    this.service.ActualizarTareaTitulo(this.tarea.IdTarea, this.getTitulo);
  }
  public actualizarEstadoTarea(): void{
    this.service.ActualizarTareaCheck(this.tarea.IdTarea, this.getCompletado());
  }
}

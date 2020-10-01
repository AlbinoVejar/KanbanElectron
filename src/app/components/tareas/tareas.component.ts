import { MainService } from './../../services/main.service';
import { Tarea } from './../../services/models/Tarea.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  @Output() actualizarTareas = new EventEmitter<void>();
  @Input() tarea: Tarea;
  @Input() idTarjeta: number;
  nuevaDescripcion = new FormControl('');
  completed = new FormControl(false);
  nuevaTarea: boolean;
  showLabel: boolean;
  diasabledButton: boolean;
  constructor(
    private service: MainService
  ) {
    this.showLabel = true;
    this.nuevaTarea = false;
    this.diasabledButton = false;
  }

  ngOnInit(): void {
  }

  // Gets
  public get getTitulo(): string{
    return this.nuevaDescripcion.value;
  }
  public controlDescripcionTarea(): void{
    this.showLabel = !this.showLabel;
  }
  public comenzarEdicion(): void{
    this.controlDescripcionTarea();
    this.nuevaDescripcion.setValue(this.tarea.Titulo);
  }
  public cancelarEdicion(): void{
    this.controlDescripcionTarea();
    this.nuevaDescripcion.reset();
  }
  public eliminarTarea(): void{
    this.service.EliminarTarea(this.tarea.IdTarea);
    this.actualizarTareas.emit();
  }
  public actualizarTarea(): void{
    this.service.ActualizarTareaTitulo(this.tarea.IdTarea, this.getTitulo);
    this.nuevaDescripcion.reset();
    this.actualizarTareas.emit();
  }
  public actualizarEstadoTarea(check: boolean): void{
    this.service.ActualizarTareaCheck(this.tarea.IdTarea, Number(check)).then(() => {
      this.actualizarTareas.emit();
    });
  }
}

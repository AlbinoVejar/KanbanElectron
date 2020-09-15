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
  nuevaDescripcion = new FormControl('');
  tareas2: FormGroup;
  nuevaTarea: boolean;
  showLabel: boolean;
  diasabledButton: boolean;
  constructor(
    private fb: FormBuilder
  ) {
    this.showLabel = true;
    this.nuevaTarea = false;
    this.diasabledButton = false;
    this.creacionForma();
    this.getCompletado();
  }

  ngOnInit(): void {
  }
  private creacionForma(): void{
    this.tareas2 = this.fb.group({
      completed: '',
      descripcion: 'prueba de tareas'
    });
  }

  // Gets
  public get getDescripcion(): string{
    return this.tareas2.get('descripcion').value;
  }
  public getCompletado(): boolean{
    return this.tareas2.get('completed').value;
  }
  public hiddenLabel(): void{
    this.showLabel = !this.showLabel;
  }
  public showNuevaTarea(): void{
    this.nuevaTarea = !this.nuevaTarea;
    this.diasabledButton = !this.diasabledButton;
  }
}

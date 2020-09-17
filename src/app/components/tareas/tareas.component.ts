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
  @Input() tareas: Tarea[];
  @Input() idTarjeta: number;
  form: FormGroup;
  nuevaDescripcion = new FormControl('');
  nuevaTarea: boolean;
  showLabel: boolean;
  diasabledButton: boolean;
  constructor(
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.showLabel = true;
    this.nuevaTarea = false;
    this.diasabledButton = false;
    // this.creacionForma();
  }

  ngOnInit(): void {
  }
  // private creacionForma(): void{
  //   this.form = this.fb.group({
  //     nuevaDescripcion: ['']
  //   });
  // }

  // Gets
  public get getTitulo(): string{
    return this.nuevaDescripcion.value;
  }
  // public get getDescripcion(): string{
  //   return this.form.get('nuevaDescripcion').value;
  // }
  public getCompletado(): boolean{
    return this.form.get('completed').value;
  }
  public hiddenLabel(): void{
    this.showLabel = !this.showLabel;
  }
  public showNuevaTarea(): void{
    this.nuevaTarea = !this.nuevaTarea;
    this.diasabledButton = !this.diasabledButton;
  }
  public crearTarea($event): void{
    // console.log(this.getTitulo);
    $event.preventDefault();
    this.service.NuevaTarea(this.getTitulo, this.idTarjeta).then((data) => {console.log(data); });
  }
  // onEncontrar(){
  //   this.service.encontrar().then((data) => {console.log(data);});
  // }
}

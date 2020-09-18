import { Seccion } from './../../../services/models/Seccion.model';
import { MainService } from './../../../services/main.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-seccion-header',
  templateUrl: './seccion-header.component.html',
  styleUrls: ['./seccion-header.component.css']
})
export class SeccionHeaderComponent implements OnInit {
  @Output() showNuevaTarjeta = new EventEmitter<boolean>();
  @Input() seccion: Seccion;
  showInputName: boolean;
  form: FormGroup;
  constructor(
    private service: MainService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
    this.showInputName = false;
  }

  ngOnInit(): void {
  }
  public crearFormulario(): void{
    this.form = this.fb.group({
      tituloSeccion: [''],
      tituloTarjeta: ['']
    });
  }
  private resetForm(): void{
    this.form.reset();
  }
  get getTituloSeccion(): string{
    return this.form.get('tituloSeccion').value;
  }
  public cambiarNombre(): void{
    this.showInputName = !this.showInputName;
  }
  public nuevaTarjeta(): void{
    console.log('hola');
    this.showNuevaTarjeta.emit(true);
  }
}

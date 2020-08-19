import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  mainPage: FormGroup;
  showInputName: boolean;
  constructor(
    private fb: FormBuilder
  ) {
    this.crearFormulario();
    this.showInputName = false;
  }
  ngOnInit(): void {
  }
  crearFormulario(): void{
    this.mainPage = this.fb.group({
      tituloSeccion: ['']
    });
  }
  get tituloPage(): string{
    return this.mainPage.get('tituloSeccion').value;
  }
  cambiarNombre(): void{
    this.showInputName = !this.showInputName;
    // console.log(this.tituloPage);
  }
  guardar(): void{
    console.log(this.tituloPage);
    // this.mainPage.reset();
  }
}

import { HttpClient } from '@angular/common/http';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  mainPage: FormGroup;
  showInputName: boolean;
  showInputTarjeta: boolean;
  showInputNuevaSeccion: boolean;
  constructor(
    private fb: FormBuilder,
    private mnService: MainService,
    private eleService: ElectronService,
  ) {
    this.crearFormulario();
    this.showInputName = false;
    this.showInputTarjeta = false;
    this.showInputNuevaSeccion = false;
  }
  ngOnInit(): void {
  }
  public crearFormulario(): void{
    this.mainPage = this.fb.group({
      tituloSeccion: [''],
      tituloTarjeta: ['']
    });
  }
  private resetForm(): void{
    this.mainPage.reset();
  }
  get tituloPage(): string{
    return this.mainPage.get('tituloSeccion').value;
  }
  public cambiarNombre(): void{
    this.showInputName = !this.showInputName;
    // console.log(this.tituloPage);
  }
  public guardar(): void{
    console.log(this.tituloPage);
    // this.mainPage.reset();
  }
  public nuevaTarjeta(): void{
    this.showInputTarjeta = !this.showInputTarjeta;
  }
  public guardarTarjeta(): void{
    this.nuevaTarjeta();
    this.resetForm();
  }
  public NuevaSeccion(): void{
    this.showInputNuevaSeccion = !this.showInputNuevaSeccion;
  }
}

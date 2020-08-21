import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  tableroActual: string;
  showEditTitulo: boolean;
  mainPage: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.showEditTitulo = false;
    this.tableroActual = data.titulo;
    this.crearForma();
  }
  ngOnInit(): void {
  }
  get getTituloFromPage(): string{
    return this.mainPage.get('nuevoTitulo').value;
  }
  private crearForma(): void{
    this.mainPage = this.fb.group({
      nuevoTitulo: this.tableroActual
    });
  }
  public guardarDatos(): void{
    console.log('Guardar Datos');
    // this.tableroActual = this.getTituloFromPage;
  }
  public guardarNuevoTitulo(): void{
    this.showEditTitulo = false;
    this.tableroActual = this.getTituloFromPage;
  }
  public editarTitulo(): void{
    this.showEditTitulo = true;
  }
}

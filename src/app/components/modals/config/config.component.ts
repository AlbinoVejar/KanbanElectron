import { MainService } from './../../../services/main.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  tableroActual: number;
  tableroTitulo: string;
  showEditTitulo: boolean;
  mainPage: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MainService
  ) {
    this.showEditTitulo = false;
    this.tableroActual = Number(data.idTablero);
    this.tableroTitulo = data.titulo;
    this.crearForma();
  }
  ngOnInit(): void {
  }
  get getTituloFromPage(): string{
    return this.mainPage.get('nuevoTitulo').value;
  }
  private crearForma(): void{
    this.mainPage = this.fb.group({
      nuevoTitulo: this.tableroTitulo
    });
  }
  public guardarDatos(): void{
    if (this.mainPage.get('nuevoTitulo').untouched){
      console.log(this.getTituloFromPage);
      this.service.ActualizarTablero(this.tableroActual, this.getTituloFromPage);
    }
    this.dialogRef.close();
    // this.tableroActual = this.getTituloFromPage;
  }
  public guardarNuevoTitulo(): void{
    this.showEditTitulo = false;
    this.tableroTitulo = this.getTituloFromPage;
  }
  public editarTitulo(): void{
    this.showEditTitulo = true;
  }
}

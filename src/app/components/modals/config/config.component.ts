import { ConfirmComponent } from './../confirm/confirm.component';
import { MainService } from './../../../services/main.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
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
  showNuevoTablero: boolean;
  mainPage: FormGroup;
  darkTheme: boolean;
  constructor(
    public dialogRef: MatDialogRef<ConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: MainService,
    private dialog: MatDialog
  ) {
    this.showNuevoTablero = false;
    this.showEditTitulo = false;
    this.tableroActual = Number(data.idTablero);
    this.tableroTitulo = data.titulo;
    this.crearForma();
    this.service.getTemaSeleccionado().then((data) => {
      if (data === 'dark'){
        this.darkTheme = true;
      }else{
        this.darkTheme = false;
      }
    });
  }
  ngOnInit(): void {
  }
  get getTituloFromPage(): string{
    return this.mainPage.get('nuevoTitulo').value;
  }
  get getTituloNuevo(): string{
    return this.mainPage.get('tableroNuevo').value;
  }
  private crearForma(): void{
    this.mainPage = this.fb.group({
      nuevoTitulo: this.tableroTitulo,
      tableroNuevo: ['']
    });
  }
  public guardarDatos(): void{
    if (!this.mainPage.get('nuevoTitulo').untouched){
      this.service.ActualizarTablero(this.tableroActual, this.getTituloFromPage);
      this.tableroTitulo = this.getTituloFromPage;
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
  public eliminarTablero(): void{
    const result = this.dialog.open(ConfirmComponent);
    result.afterClosed().subscribe((data: boolean) => {
      if (data){
        this.service.EliminarTablero(this.tableroActual);
      }
    });
  }
  public nuevoTablero(): void{
    this.showNuevoTablero = true;
  }
  public guardarNuevoTablero(): void{
    this.service.NuevoTablero(this.getTituloNuevo).then((data) => {});
    this.showNuevoTablero = false;
    this.mainPage.reset();
  }
  public isDarkTheme(checked: boolean): void{
    if (checked){
      this.service.ActualizarTemaSeleccionado('dark');
    }
    else{
      this.service.ActualizarTemaSeleccionado('light');
    }
  }
}

import { SeccionesComponent } from './../../secciones/secciones.component';
import { iTablero } from './../../../services/interfaces/iTablero';
import { Usuario } from './../../../services/models/Usuario.model';
import { MainService } from './../../../services/main.service';
import { Tablero } from './../../../services/models/Tablero.model';
import { ConfigComponent } from './../../modals/config/config.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(SeccionesComponent)
  private seccionesComponent: SeccionesComponent;
  mainForm: FormGroup;
  selectTableros: boolean;
  titulo: string;
  selectTablero: number;
  tableros: Tablero[] = [];
  usuario: Usuario;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public service: MainService
  ) {
    this.crearForm();
    // this.selectTablero = this.service.getSelectTablero;
    this.getTableros().then((data) => {
      this.selectTablero = this.tableros[0].IdTablero;
      this.titulo = this.tableros[0].Titulo;
      this.service.setSelectTablero(this.selectTablero);
    });
    this.selectTableros = false;
  }

  ngOnInit(): void {
  }

  private async getTableros(){
    const data = await this.service.getAllTableros(1);
    this.tableros = data;
  }
  crearForm(): void{
    this.mainForm = this.fb.group({
      tituloTablero: ['']
    });
  }

  get getTituloTablero(): string{
    return this.mainForm.get('tituloTablero').value;
  }
  cambiarTablero(selected: string): void{
    if (selected){
      this.titulo = this.tableros[Number(selected) - 1].Titulo;
      this.selectTablero = Number(selected);
      this.service.setSelectTablero(this.selectTablero);
      this.seccionesComponent.cambiarSecciones(this.selectTablero);
    }
  }
  // Dialogs
  openConfig(data: string): void{
    const dialogConfig = this.dialog.open(ConfigComponent, {
      width: '400px',
      data: {titulo: this.titulo, idTablero: this.selectTablero}
    });

    dialogConfig.afterClosed().subscribe((result: any) => {
      this.titulo = result;
    });
  }
}

import { ConfigComponent } from './../../modals/config/config.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainForm: FormGroup;
  selectTableros: boolean;
  titulo: string;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.crearForm();
    this.titulo = this.getTituloTablero;
    this.selectTableros = false;
  }

  ngOnInit(): void {
  }
  crearForm(): void{
    this.mainForm = this.fb.group({
      tituloTablero: ['Titulo prueba']
    });
  }

  get getTituloTablero(): string{
    return this.mainForm.get('tituloTablero').value;
  }

  showOptionsTablero(): void{
    this.selectTableros = !this.selectTableros;
  }
  cambiarTablero(selected: string): void{
    if (selected){
      this.titulo = this.getTituloTablero;
    }
    this.showOptionsTablero();
  }
  // Dialogs
  openConfig(): void{
    const dialogConfig = this.dialog(ConfigComponent, {
      width: '250px'
    });
  }
}

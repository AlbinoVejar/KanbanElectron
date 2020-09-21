import { MainService } from './../../../services/main.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  id: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialog: MatDialogRef<ConfirmComponent>,
    private server: MainService
  ) {
    this.id = data;
  }

  ngOnInit(): void {
  }
  public eliminarTarjeta(): void{
    this.server.EliminarTarjeta(this.id);
    this.dialog.close();
  }
}

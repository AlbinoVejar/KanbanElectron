import { MainService } from './services/main.service';
import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KanbaMe';
  darkTheme: boolean;
  constructor(
    private overlayContainer: OverlayContainer,
    private service: MainService
  ){
    this.service.getTemaSeleccionado().then((data) => {
      if (data === 'dark'){
        this.darkTheme = true;
      }else{
        this.darkTheme = false;
      }
    });
  }
  public cambiarTema(): void{
    this.service.getTemaSeleccionado().then((data) => {
      if (data === 'dark'){
        this.darkTheme = true;
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      }else{
        this.darkTheme = false;
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
  }
}

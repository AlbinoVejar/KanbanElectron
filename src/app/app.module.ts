import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ConfigComponent } from './components/modals/config/config.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxElectronModule } from 'ngx-electron';
import { TareasComponent } from './components/tareas/tareas.component';
import { MainComponent } from './components/modals/main/main.component';
import { BooleanPipe } from './services/pipes/boolean.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SeccionesComponent,
    NavbarComponent,
    ConfigComponent,
    TarjetasComponent,
    TareasComponent,
    MainComponent,
    BooleanPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxElectronModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ConfigComponent } from './components/modals/config/config.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxElectronModule } from 'ngx-electron';
import { TareasComponent } from './components/tareas/tareas.component';
import { MainComponent } from './components/modals/main/main.component';
import { BooleanPipe } from './services/pipes/boolean.pipe';
import { SeccionHeaderComponent } from './components/shared/seccion-header/seccion-header.component';
import { ConfirmComponent } from './components/modals/confirm/confirm.component';
import { SeccionActionsComponent } from './components/shared/seccion-actions/seccion-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    SeccionesComponent,
    NavbarComponent,
    ConfigComponent,
    TarjetasComponent,
    TareasComponent,
    MainComponent,
    BooleanPipe,
    SeccionHeaderComponent,
    ConfirmComponent,
    SeccionActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxElectronModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

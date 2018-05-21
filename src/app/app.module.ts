import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DocumentoComponent } from './components/documento.component';
import { DocumentoAdminComponent } from './components/documento.admin.component';
import { ModeloComponent } from './components/modelo.component';
import { ModeloNewComponent } from './components/modelo.new.component';
import { MensajeComponent } from './components/mensaje.component';
import { MensajeNewComponent } from './components/mensaje.new.component';
import { MensajeAdminComponent } from './components/mensaje.admin.component';
import { DefaultComponent } from './components/default.component';
import { ClienteComponent } from './components/cliente.component';
import { ClienteNewComponent } from './components/cliente.new.component';
import { ActividadComponent } from './components/actividad.component';
import { GenerateDatePipe } from './pipes/generate.date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RegisterComponent,
    DefaultComponent,
    DocumentoComponent,
    DocumentoAdminComponent,
    ModeloComponent,
    ModeloNewComponent,
    MensajeComponent,
    MensajeNewComponent,
    MensajeAdminComponent,
    ClienteComponent,
    ClienteNewComponent,
    ActividadComponent,
    GenerateDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    routing
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [ AppComponent ],
  exports: [ AppComponent ]
})
export class AppModule { }

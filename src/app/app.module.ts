import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DocumentoComponent } from './components/documento.component';
import { DocumentoNewComponent } from './components/documento.new.component';
import { ModeloComponent } from './components/modelo.component';
import { ModeloNewComponent } from './components/modelo.new.component';
import { MensajeComponent } from './components/mensaje.component';
import { MensajeNewComponent } from './components/mensaje.new.component';
import { DefaultComponent } from './components/default.component';
import { ClienteComponent } from './components/cliente.component';
import { ClienteNewComponent } from './components/cliente.new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RegisterComponent,
    DefaultComponent,
    DocumentoComponent,
    DocumentoNewComponent,
    ModeloComponent,
    ModeloNewComponent,
    MensajeComponent,
    MensajeNewComponent,
    ClienteComponent,
    ClienteNewComponent
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

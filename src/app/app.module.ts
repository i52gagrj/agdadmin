import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DocumentoComponent } from './components/documento.component';
import { ModeloComponent } from './components/modelo.component';
import { MensajeComponent } from './components/mensaje.component';
import { DefaultComponent } from './components/default.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RegisterComponent,
    DefaultComponent,
    DocumentoComponent,
    ModeloComponent,
    MensajeComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    routing
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

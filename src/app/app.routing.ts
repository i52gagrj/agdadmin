import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DefaultComponent } from './components/default.component';
import { DocumentoComponent } from './components/documento.component';
import { DocumentoAdminComponent } from './components/documento.admin.component';
import { ModeloComponent } from './components/modelo.component';
import { ModeloNewComponent } from './components/modelo.new.component';
import { MensajeComponent } from './components/mensaje.component';
import { MensajeNewComponent } from './components/mensaje.new.component';
import { MensajeAdminComponent } from './components/mensaje.admin.component';
import { ClienteComponent } from './components/cliente.component';
import { ClienteNewComponent } from './components/cliente.new.component';
import { ActividadComponent } from './components/actividad.component';
 
const appRoutes: Routes = [
	{path:'', component: ClienteComponent},
	{path:'login', component: LoginComponent},
	{path:'login/:id', component: LoginComponent},
	{path:'register', component: RegisterComponent},
	{path:'documento', component: DocumentoComponent},		
	{path:'documento/:page', component: DocumentoComponent},
	{path:'documento-admin', component: DocumentoAdminComponent},
	{path:'documento-admin/:page', component: DocumentoAdminComponent},	
	{path:'modelo', component: ModeloComponent},	
	{path:'modelo/:page', component: ModeloComponent},
	{path:'modelo-new', component: ModeloNewComponent},
	{path:'mensaje', component: MensajeComponent},
	{path:'mensaje/:page', component: MensajeComponent},
	{path:'mensaje-new', component: MensajeNewComponent},
	{path:'mensaje-admin', component: MensajeAdminComponent},
	{path:'mensaje-admin/:page', component: MensajeAdminComponent},
	{path:'cliente', component: ClienteComponent},
	{path:'cliente/:page', component: ClienteComponent},
	{path:'cliente-new', component: ClienteNewComponent},
	{path:'actividad', component: ActividadComponent},
	{path:'**', component: LoginComponent}
	
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

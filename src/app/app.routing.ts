import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DefaultComponent } from './components/default.component';
import { DocumentoComponent } from './components/documento.component';
import { ModeloComponent } from './components/modelo.component';
import { MensajeComponent } from './components/mensaje.component';
 
const appRoutes: Routes = [
	{path:'', component: DefaultComponent},
	{path:'login', component: LoginComponent},
	{path:'login/:id', component: LoginComponent},
	{path:'register', component: RegisterComponent},
	{path:'documento', component: DocumentoComponent},
	{path:'modelo', component: ModeloComponent},
	{path:'mensaje', component: MensajeComponent},
	{path:'**', component: LoginComponent} 
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

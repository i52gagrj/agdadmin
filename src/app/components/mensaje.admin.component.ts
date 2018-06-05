import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Mensaje } from '../models/mensaje';
import { UserService } from '../services/user.service';
import { MensajeService } from '../services/mensaje.service';
import { DataTableModule } from 'angular2-datatable';

@Component({
	selector: 'mensaje-admin',
	templateUrl: '../views/mensaje.admin.html',
	providers: [UserService, MensajeService]
})
export class MensajeAdminComponent implements OnInit{
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";
    
    public title: string;
    public identity;
    public token;
    public mensajes: Array<Mensaje>;
    public mensaje: Mensaje;
    public pages;
    public id;
    public pagePrev;
    public pageNext;
    public loading;
    public cliente;
    public status_mensaje;
    public origen;
    public contestamensaje = false;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _mensajeService: MensajeService
	){
		this.title = 'Mensajes';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  
        this.cliente = null;
	}

	ngOnInit(){
        console.log('El componente mensaje.admin.component ha sido cargado!!');  
        this.mensaje = new Mensaje(1, null, this.identity.sub, 0, "null");         
        this.mostrarNuevosMensajes();        
	}

	mostrarNuevosMensajes(){                              
        this.loading = 'show';            
        this._mensajeService.getNuevosMensajes(this.token).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                     
                    this.mensajes = response.data;
                    this.token = this._userService.setToken(response.token);                 
                    this.loading = 'hide';
                }
            },
            error => {
                console.log(<any>error);
            }
        );        
    }

    cambiarVisto(id, estado){
        console.log(id);
        console.log(estado);
        if(estado == false){ 
            estado = true;
        }else{
            estado = false;
        }
        console.log(estado);

        this._mensajeService.cambiarEstado(this.token,id,estado).subscribe(
            response => {                
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                   
                    if(response.token){
                        this.token = this._userService.setToken(response.token);
                    }              
                    this.status_mensaje = response.status;                    
                    if(this.status_mensaje != 'success'){
                        this.status_mensaje = 'error';
                    }else{
                        console.log(response);
                        console.log(this.status_mensaje);
                        //this._router.navigate(['/mensaje']);
                    }
                }                   
            },
            error => {
                console.log(<any>error)
            }
        );
    }  
    
    responder(id,usuario){
        //this.cambiarVisto(id,false);  
        //this._router.navigate(['/mensaje-new']); 
        if(this.contestamensaje) {
            this.contestamensaje = false;
        }
        else{
            this.contestamensaje = true;
        }    
        console.log(id);
        console.log(usuario);
        this.mensaje.receptor = usuario;
        this.origen = id;
    }

    onSubmit(){        
        this._mensajeService.create(this.token, this.mensaje).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                   
                    if(response.token){
                        this.token = this._userService.setToken(response.token);
                    }              
                    this.status_mensaje = response.status;                    
                    if(this.status_mensaje != 'success'){
                        this.status_mensaje = 'error';
                    }else{
                        this.mensaje = response.data;
                        //this._router.navigate(['/mensaje-admin']);
                        this.contestamensaje = false;
                        this.cambiarVisto(this.origen, false);
                    }
                }                    
            },
            error => {
                console.log(<any>error)
            }
        );
    }
    
}
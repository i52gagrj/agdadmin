import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Mensaje } from '../models/mensaje';
import { UserService } from '../services/user.service';
import { MensajeService } from '../services/mensaje.service';
import { DataTableModule } from 'angular2-datatable';

@Component({
	selector: 'mensaje',
	templateUrl: '../views/mensaje.html',
	providers: [UserService, MensajeService]
})
export class MensajeComponent implements OnInit{
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";

    public title: string;
    public identity;
    public token;
    public mensajes: Array<Mensaje>;
    public pages;
    public id;
    public pagePrev;
    public pageNext;
    public loading;
    public cliente;
    public status_mensaje;

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
        console.log('El componente mensaje.component ha sido cargado!!');             
        this.mostrarTodosMensajes();        
	}

	mostrarTodosMensajes(){
        this.cliente = this._userService.getCliente();        
        if(this.cliente != null){
            this.id = this.cliente.id;
        }else{
            this.id = null;
        } 
                    
        this.loading = 'show';            
        this._mensajeService.getMensajes(this.token, this.id).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{ 
                    this.loading = 'hide';
                    if(response.token){
                        this.token = this._userService.setToken(response.token);
                    }                                                                    
                    if(response.status == 'success')
                    {    
                        this.mensajes = response.data;                                                   
                    } 
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
                console.log(response);
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
                        this.mostrarTodosMensajes();
                    }
                }                   
            },
            error => {
                console.log(<any>error)
            }
        );
    } 
    
}	
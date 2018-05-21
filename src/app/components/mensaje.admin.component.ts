import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Mensaje } from '../models/mensaje';
import { UserService } from '../services/user.service';
import { MensajeService } from '../services/mensaje.service';

@Component({
	selector: 'mensaje-admin',
	templateUrl: '../views/mensaje.admin.html',
	providers: [UserService, MensajeService]
})
export class MensajeAdminComponent implements OnInit{
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
        this.mostrarNuevosMensajes();        
	}

	mostrarNuevosMensajes(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if(!page){
                page = 1;
            }
                        
            this.loading = 'show';            
            this._mensajeService.getNuevosMensajes(this.token, page).subscribe(
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

                        // Total paginas
                        this.pages = [];
                        for(let i = 0; i < response.total_pages; i++){
                            this.pages.push(i);                        
                        }

                        // Pagina anterior
                        if(page >= 2){
                            this.pagePrev = (page - 1);
                        }else{
                            this.pagePrev = page;                        
                        }  

                        // Pagina siguiente
                        if(page < response.total_pages){
                            this.pageNext = (page+1);
                        }else{
                            this.pageNext = page;
                        }
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        }); 
    }
    
}
import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Modelo } from '../models/modelo';
import { UserService } from '../services/user.service';
import { ModeloService } from '../services/modelo.service';
import { DataTableModule } from 'angular2-datatable';

@Component({
	selector: 'modelo',
	templateUrl: '../views/modelo.html',
	providers: [UserService, ModeloService]
})
export class ModeloComponent implements OnInit{
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";

    public title: string;
    public identity;
    public token;
    public modelos: Array<Modelo>;
    public pages;
    public pagePrev;
    public pageNext;
    public loading;
    public cliente;
    public file: File;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _modeloService: ModeloService
	){
		this.title = 'Modelos';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  
        this.cliente = null;

	}

	ngOnInit(){
        console.log('El componente modelo.component ha sido cargado!!');
        this.cargarCliente();
		this.mostrarTodosModelos();
	}

	mostrarTodosModelos(){
        let cliente = this._userService.getCliente();
        if(cliente != null){
            this.cliente = cliente.id;
        }else{
            this.cliente = null;
        }             

        this.loading = 'show';            
        this._modeloService.getModelos(this.token, this.cliente).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                     
                    this.modelos = response.data;
                    this.token = this._userService.setToken(response.token);
                    this.loading = 'hide';

                    // Total paginas
                    /*this.pages = [];
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
                    }*/
                }
            },
            error => {
                console.log(<any>error);
            }
        );             
    }

    mostrarModelo(id){                  
        this._modeloService.getModelo(this.token, id).subscribe(            
            response => {                    
                if(!response.status){                    
                    this.file = response;                    
                    console.log("Información recibida");          
                    var url= window.URL.createObjectURL(this.file);          
                    window.open(url);
                    this.mostrarTodosModelos();
                }
                else{
                    if(response.code = 405){
                        console.log("Token caducado. Reiniciar sesión");
                        this._userService.logout();
                        this.identity = null;
                        this.token = null;
                        window.location.href = '/login';                        
                    }else{
                        console.log(response);              
                        this.token = this._userService.setToken(response.token);           
                    }                         
                }               
            },
            error => {                
                console.log(<any>error);                
            }
        );                
    }    

    cargarCliente(){
        this.cliente = this._userService.getCliente();                                         
    }       
}	
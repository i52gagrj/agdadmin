import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Documento } from '../models/documento';
import { Sesion } from '../models/sesion';
import { Descarga } from '../models/descarga';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';
import { SesionService } from '../services/sesion.service';
import { DescargaService } from '../services/descarga.service';
import { DataTableModule } from 'angular2-datatable';


@Component({
	selector: 'actividad',
	templateUrl: '../views/actividad.html',
	providers: [UserService, DocumentoService, SesionService, DescargaService]
})
export class ActividadComponent implements OnInit{
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";
    
    public title: string;
    public identity;
    public token;
    public documentos: Array<Documento>;
    public sesiones: Array<Sesion>;
    public descargas: Array<Descarga>;
	public cliente = null;
    public pagesses;
    public pagesdoc;
    public pagesdes;
    public pagePrevses;
    public pagePrevDoc;   
    public pagePrevDes;
    public pageNextses;
    public pageNextDoc;    
    public pageNextDes;
    public loading1;
    public loading2;
    public loading3;
    public file: File;
	public id = null;	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
        private _documentoService: DocumentoService,
        private _sesionService: SesionService,
        private _descargaService: DescargaService
	){
		this.title = 'Actividad';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  
	}

	ngOnInit(){
		console.log('El componente actividad.component ha sido cargado!!');
		
        this.mostrarTodosDocumentos();
        this.mostrarTodasDescargas();
        this.mostrarTodasSesiones();        
	}

    mostrarTodosDocumentos(pagedoc = null){        
        this.cliente = this._userService.getCliente();

        if(this.cliente != null){
            this.id = this.cliente.id;
        }else{
            this.id = null;
        } 
                    
        this.loading1 = 'show';   
        this._documentoService.getDocumentos(this.token, this.id).subscribe(
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
                    this.loading1 = 'hide';

                    if(response.status == 'success'){
                        this.documentos = response.data;                                                                                                                  
                        // Total paginas
                        /*this.pagesdoc = [];
                        for(let i = 0; i < response.total_pages; i++){
                            this.pagesdoc.push(i);                                                    
                        }                        

                        // Pagina anterior
                        if(pagedoc >= 2){
                            this.pagePrevDoc = (pagedoc - 1);
                        }else{
                            this.pagePrevDoc = pagedoc;                        
                        }  

                        // Pagina siguiente
                        if(pagedoc < response.total_pages){
                            this.pageNextDoc = (pagedoc+1);
                        }else{
                            this.pageNextDoc = pagedoc;
                        }*/
                    }
                }
            },
            error => {
                console.log(<any>error);    
            }
        );                 
    }  

	mostrarTodasDescargas(){                    
        this.cliente = this._userService.getCliente();
                    
        if(this.cliente != null){
            this.id = this.cliente.id;
        }else{
            this.id = null;
        }                     

        this.loading2 = 'show';            
        this._descargaService.getDescargas(this.token, this.id).subscribe(
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
                    this.loading2 = 'hide';

                    if(response.status == 'success'){
                        this.descargas = response.data;                                            
                        // Total paginas
                        /*this.pagesdes = [];
                        for(let i = 0; i < response.total_pages; i++){
                            this.pagesdes.push(i);                        
                        }

                        // Pagina anterior
                        if(pagedes >= 2){
                            this.pagePrevDes = (pagedes - 1);
                        }else{
                            this.pagePrevDes = pagedes;                        
                        }  

                        // Pagina siguiente
                        if(pagedes < response.total_pages){
                            this.pageNextDes = (pagedes+1);
                        }else{
                            this.pageNextDes = pagedes;
                        }*/
                    }
                }
            },
            error => {
                console.log(<any>error);
            }
        );      
    }

    mostrarTodasSesiones(){                    
        this.cliente = this._userService.getCliente();
        
        if(this.cliente != null){
            this.id = this.cliente.id;
        }else{
            this.id = null;
        }                 

        this.loading3 = 'show';   
        this._sesionService.getSesiones(this.token, this.id).subscribe(
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
                    this.loading3 = 'hide';                    

                    if(response.status=='success'){
                        this.sesiones = response.data;                                                              
                                
                        // Total paginas
                        /*this.pagesses = [];
                        for(let i = 0; i < response.total_pages; i++){
                            this.pagesses.push(i);                                                 
                        }

                        // Pagina anterior
                        if(pageses >= 2){
                            this.pagePrevses = (pageses - 1);
                        }else{
                            this.pagePrevses = pageses;                        
                        }  

                        // Pagina siguiente
                        if(pageses < response.total_pages){
                            this.pageNextses = (pageses+1);
                        }else{
                            this.pageNextses = pageses;
                        }*/
                    }
                }
            },
            error => {
                console.log(<any>error);    
            }
        );             
    }          
}	
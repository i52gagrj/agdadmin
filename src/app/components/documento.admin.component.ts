import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Documento } from '../models/documento';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';
import { DataTableModule } from 'angular2-datatable';

@Component({
	selector: 'documento-admin',
	templateUrl: '../views/documento.admin.html',
	providers: [UserService, DocumentoService]
})
export class DocumentoAdminComponent implements OnInit {
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";

    public title: string;
    public identity;
    public token;
    public documentos: Array<Documento>;
    public status_documento;
    public pages;
    public pagePrev;
    public pageNext;
    public loading;
    public id;
    public documento;
    public cliente;
    public file: File;
    //public status_documento;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _documentoService: DocumentoService
	) {
		this.title = 'Documentos';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  
        this.cliente = null;
	}

	ngOnInit() {
        console.log('El componente documento.component ha sido cargado!!');	        
        this.mostrarNuevosDocumentos();                    
    }

    mostrarNuevosDocumentos(){                               
        this.loading = 'show';   
        this._documentoService.getDocumentosNuevos(this.token).subscribe(
            response => {                    
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{    
                    this.documentos = response.data;
                    this.token = this._userService.setToken(response.token);                                                
                    this.loading = 'hide';                  
                }
            },
            error => {
                console.log(<any>error);    
            }
        );               
    }

    mostrarDocumento(id){       
        this._documentoService.getDocumento(this.token, id).subscribe(            
            response => {
                
                if(!response.status){                    
                    this.file = response;                    
                    console.log("Información recibida");          
                    var url= window.URL.createObjectURL(this.file);          
                    window.open(url);
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

        this._documentoService.cambiarEstado(this.token,id,estado).subscribe(
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
                    this.status_documento = response.status;                    
                    if(this.status_documento != 'success'){
                        this.status_documento = 'error';
                    }else{
                        console.log(response);
                        console.log(this.status_documento);
                        this._router.navigate(['/documento-admin']);
                    }
                }                   
            },
            error => {
                console.log(<any>error)
            }
        );
    }        
    
}
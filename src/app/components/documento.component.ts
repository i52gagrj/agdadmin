import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { RutasDeArchivosService } from '../rutas-de-archivos.service';
//import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Documento } from '../models/documento';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';

@Component({
	selector: 'documento',
	templateUrl: '../views/documento.html',
	providers: [UserService, DocumentoService]
})
export class DocumentoComponent implements OnInit {
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

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _documentoService: DocumentoService
	) {
		this.title = 'Documentos';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  
	}

	ngOnInit() {
		console.log('El componente documento.component ha sido cargado!!');	
        this.mostrarTodosDocumentos();
    }

    mostrarTodosDocumentos(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if(!page){
                page = 1;
            }
                        
            this._documentoService.getDocumentos(this.token, page).subscribe(
                response => {
                    console.log(this.token);
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
                        console.log(this.token);
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

    mostrarDocumento(id){       
        this._documentoService.getDocumento(this.token, id).subscribe(            
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión");
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{  
                    console.log("Información recibida");
                    this.status_documento = response.status;  
                    this.token = this._userService.setToken(response.token);                   
                    if(this.status_documento != 'success'){
                        this.status_documento = 'error';
                    }else{
                        this.documento = response.data;
                        //this._router.navigate(['/mostrardocumento']);
                    }     
                }               
            },
            error => {
                console.log(<any>error)                
            }
        );        
    }

    borrarDocumento(id){        
        this._documentoService.borrarDocumento(this.token, id).subscribe(            
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                                                                           
                    this.status_documento = response.status;
                    this.token = this._userService.setToken(response.token);                     
                    if(this.status_documento != 'success'){
                        this.status_documento = 'error';
                    }else{                        
                        this.mostrarTodosDocumentos();
                    }         
                }               
            },
            error => {
                console.log(<any>error)                
            }
        );         
    }
}


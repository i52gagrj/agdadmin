import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    public cliente;
    public file: File;

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
        this.cargarCliente();    
        this.mostrarTodosDocumentos();                    
    }

    mostrarTodosDocumentos(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if(!page){
                page = 1;
            }

            let cliente = this._userService.getCliente();
            if(cliente != null){
                this.cliente = cliente.id;
            }else{
                this.cliente = null;
            } 
                        
            this.loading = 'show';   
            //console.log(this.cliente);
            //console.log(this._userService.getCliente());            
            //console.log((this._userService.getCliente()).id);
            this._documentoService.getDocumentos(this.token, this.cliente, page).subscribe(
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
                
                if(response.status == 'success'){
                    let prueba = JSON.stringify(response);
                    this.file = response.file;
                    console.log("Información recibida");
                    //this.file = response.file;
                    console.log(prueba);  
                    console.log(this.file);
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
                        //this._router.navigate(['/mostrardocumento']);
                    } 
                        
                }               
            },
            error => {
                console.log("AQUÍ!!!");
                console.log(<any>error);                
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

    cargarCliente(){
		this._route.params.forEach((params: Params) => {
			let logout = +params['id'];
			if(logout == 1) {				                
                //console.log("cliente borrado"); 
                localStorage.removeItem('cliente');
            }        
        });   
        this.mostrarTodosDocumentos();                                          
    }
}


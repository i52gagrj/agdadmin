import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Documento } from '../models/documento';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';

@Component({
	selector: 'mostrardocumento',
	templateUrl: '../views/mostrardocumento.html',
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
    }

    mostrarDocumento(){
        //console.log(this.file);
        //console.log(this.documento);
        
        this._documentoService.getDocumento(this.token, this.id).subscribe(            
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
}
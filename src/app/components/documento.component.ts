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
    public pages;
    public pagePrev;
    public pageNext;
    public loading;

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

            this.loading = 'show'
            this._documentoService.getDocumentos(this.token, page).subscribe(
                response => {
                    this.documentos = response.data;
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
                },
                error => {
                    console.log(<any>error);
                }
            );
        }); 
        console.log(this.loading);
    }
}


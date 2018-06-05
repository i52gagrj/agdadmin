import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Documento } from '../models/documento';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';
import { saveAs } from 'file-saver';
import { DataTableModule } from 'angular2-datatable';
//import { DataTableResource } from 'angular2-datatable';
//import { DataTableModule } from 'angular-4-data-table';
//import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'prueba',
  templateUrl: '../views/prueba.html',
  providers: [UserService, DocumentoService]
})

export class PruebaComponent implements OnInit {
    //public data: any[];
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "";
    public sortOrder = "desc";
    
    public loading;
    public title: string;
    public identity;
    public token;
    public data: Array<Documento>;
    public status_documento;
    public pages;
    public pagePrev;
    public pageNext;  
    public id;
    public documento;
    public cliente;
  
    constructor(private _http: Http,
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

    ngOnInit(){
        console.log('El componente prueba.component ha sido cargado!!');	        
        this.load();
    }       

    load(){  
      let page = 1;  
      this.loading = 'show';   
      this._documentoService.getDocumentosPrueba(this.token).subscribe(
            response => {                    
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{    
                    this.data = response.data;
                    this.token = this._userService.setToken(response.token);                                                
                    this.loading = 'hide';                  
                }
            },
            error => {
                console.log(<any>error);    
            }
        );  
    }  
}

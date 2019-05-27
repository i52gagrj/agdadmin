import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../models/cliente';
import { UserService } from '../services/user.service';
import { DocumentoService } from '../services/documento.service';
import { DataTableModule } from 'angular2-datatable'; 

@Component({
	selector: 'cliente',
	templateUrl: '../views/cliente.html',
	providers: [UserService, DocumentoService]
})
export class ClienteComponent implements OnInit {
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "";
    public sortOrder = "desc";

    public title: string;
    public identity;
    public token;
    public clientes: Array<Cliente>;
    public pages;
    public pagePrev;
    public pageNext;
    public loading;
    public id;
    public clienteE;
    public busqueda;    

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) {
		this.title = 'Clientes';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();  
	}

	ngOnInit() {
		console.log('El componente documento.component ha sido cargado!!');	
        this.mostrarTodosClientes();
    }

    mostrarTodosClientes(){        
        if(this._userService.getCliente()){
            this.clienteE = this._userService.getCliente();
        }

        this.loading = 'show';            
        this._userService.getClientes(this.token).subscribe(
            response => {                    
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{    
                    this.clientes = response.data;
                    this.token = this._userService.setToken(response.token);                                                
                    this.loading = 'hide';    
                    console.log(this.clientes);
                    console.log(this.clienteE);
                    console.log(this.loading);
                }
            },
            error => {
                console.log(<any>error);    
            }
        );               
    }

    seleccionar(cliente){
        localStorage.setItem('cliente', JSON.stringify(cliente));
        this.clienteE = cliente;
        location.reload();
    }

    anular(){
        localStorage.removeItem('cliente');
        this.clienteE = null;
        location.reload();
    }
}
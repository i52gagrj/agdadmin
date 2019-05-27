import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../models/cliente';
import { UserService } from '../services/user.service';

@Component({
    selector: 'cliente-new',
    templateUrl: '../views/cliente.new.html',
    providers: [UserService]
})
export class ClienteNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public cliente: Cliente;
    public clavebis;
    public status_cliente;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService        
    ){
        this.page_title = 'Añadir nuevo cliente';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        if(this.identity == null && !this.identity.sub){
            this._router.navigate(['/login']);
        }else {
            this.cliente = new Cliente(1, "", "", "", this.identity.sub, false, null);
        }       
        console.log('El componente cliente.new.component ha sido cargado!!');         
    }

    onSubmit(){        
        this._userService.create(this.token, this.cliente).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        
                }
                else{                   
                    this.token = this._userService.setToken(response.token);              
                    this.status_cliente = response.status;                    
                    if(this.status_cliente != 'success'){
                        this.status_cliente = 'error';
                    }else{
                        this.cliente = response.data;
                        this._router.navigate(['/cliente']);
                    }
                }                    
            },
            error => {
                console.log(<any>error)
            }
        );
    }
}
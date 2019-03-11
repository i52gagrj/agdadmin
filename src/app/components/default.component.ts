import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'default',
	templateUrl: '../views/default.html'
})
export class DefaultComponent implements OnInit{	
	public title: string;
	public documentos_admin;
	public clientes_admin;
	public mensajes_admin;
	public token;
	//public info;	
	public identity;	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'AGD - Administradores';
	}

	ngOnInit(){
		console.log('El componente Default ha sido cargado!!');
		this.redirectIfNoIdentity();
		this.mostrarDatos();		
	}

	redirectIfNoIdentity() {
		let identity = this._userService.getIdentity();
		if(identity == null) {
			this._router.navigate(["/login"]);
		}		
	}	

	mostrarDatos(){
		//Llamar al backend, y pedir el número de documentos, modelos y mensajes del cliente		     
		this.token = this._userService.getToken();   
		//console.log(this.token);
        this._userService.returnInfoAdmin(this.token).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
					this.token = null;
					console.log("Estoy aquí")
                    window.location.href = '/login';                        
				}

                if(response.code == 200){                     
                    //this.info = response.data;
					this.token = this._userService.setToken(response.token);                    
					this.documentos_admin = response.documents[1];
					this.clientes_admin = response.clients[1];
					this.mensajes_admin = response.messages[1];
					console.log("Resultados");
					console.log(this.documentos_admin);
					console.log(this.clientes_admin);
					console.log(this.mensajes_admin);
                }
            },
            error => {
                console.log(<any>error);
            }
        );	
	}	
}
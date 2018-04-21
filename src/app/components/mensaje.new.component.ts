import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Mensaje } from '../models/mensaje';
import { UserService } from '../services/user.service';
import { MensajeService } from '../services/mensaje.service';

@Component({
    selector: 'mensaje-new',
    templateUrl: '../views/mensaje.new.html',
    providers: [UserService, MensajeService]
})
export class MensajeNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public mensaje: Mensaje;
    public status_mensaje;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _mensajeService: MensajeService        
    ){
        this.page_title = 'Crear nueva tarea';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        if(this.identity == null && !this.identity.sub){
            this._router.navigate(['/login']);
        }else {
            this.mensaje = new Mensaje(1, null, this.identity.sub, this.identity.admin, "null");
        }        
    }

    onSubmit(){
        console.log(this.mensaje);
        
        this._mensajeService.create(this.token, this.mensaje).subscribe(
            response => {
                this.status_mensaje = response.status;
                console.log(this.status_mensaje);
                if(this.status_mensaje != 'success'){
                    this.status_mensaje = 'error';
                }else{
                    this.mensaje = response.data;
                    this._router.navigate(['/mensaje']);
                }                
            },
            error => {
                console.log(<any>error)
            }
        );
    }
}
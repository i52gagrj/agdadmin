import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modelo } from '../models/modelo';
import { UserService } from '../services/user.service';
import { ModeloService } from '../services/modelo.service';


@Component({
    selector: 'modelo-new',
    templateUrl: '../views/modelo.new.html',
    providers: [UserService, ModeloService]
})
export class ModeloNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public file: File;    
    public modelo: Modelo;
    public status_modelo;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _modeloService: ModeloService      
    ){
        this.page_title = 'Añadir un nuevo modelo';
        this.identity = this._userService.getIdentity();  
        this.token = this._userService.getToken();
        //this.url = GLOBAL.url;
    }

    ngOnInit(){
        if(this.identity == null && !this.identity.sub){
            this._router.navigate(['/login']);
        }else {
            this.modelo = new Modelo(1, "", "", 1, 1, "", "", 1, "null");
        }   
        console.log('El componente modelo.new.component ha sido cargado!!');     
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.file = fileList[0];            
        }
    }

    onSubmit(){
        this._modeloService.create(this.token, this.modelo, this.file).subscribe(            
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    /*this._userService.logout();
                    this.identity = null;
                    this.token = null;
                    window.location.href = '/login';                        */
                }
                else{                                                         
                    this.status_modelo = response.status;
                    this.token = this._userService.setToken(response.token);                     
                    if(this.status_modelo != 'success'){
                        this.status_modelo = 'error';
                    }else{
                        this.modelo = response.data;
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
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
//import { UserService } from '../services/user.service';

@Component({
	selector: 'mensaje',
	templateUrl: '../views/mensaje.html'/*,
	providers: [UserService]*/
})
export class MensajeComponent implements OnInit{
	public title: string;
	//public user;
	//public identity;
	//public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		//private _userService: UserService
	){
		this.title = 'Mensajes del usuario';

	}

	ngOnInit(){
		console.log('El componente mensaje.component ha sido cargado!!');

	}

}	
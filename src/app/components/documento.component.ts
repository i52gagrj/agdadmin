import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
//import { UserService } from '../services/user.service';

@Component({
	selector: 'documento',
	templateUrl: '../views/documento.html'/*,
	providers: [UserService]*/
})
export class DocumentoComponent implements OnInit{
	public title: string;
	//public user;
	//public identity;
	//public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		//private _userService: UserService
	){
		this.title = 'Documentos del usuario';

	}

	ngOnInit(){
		console.log('El componente documento.component ha sido cargado!!');

	}

}	
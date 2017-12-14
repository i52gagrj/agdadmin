import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
//import { UserService } from '../services/user.service';

@Component({
	selector: 'modelo',
	templateUrl: '../views/modelo.html'/*,
	providers: [UserService]*/
})
export class ModeloComponent implements OnInit{
	public title: string;
	//public user;
	//public identity;
	//public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		//private _userService: UserService
	){
		this.title = 'Modelos del usuario';

	}

	ngOnInit(){
		console.log('El componente modelo.component ha sido cargado!!');

	}

}	
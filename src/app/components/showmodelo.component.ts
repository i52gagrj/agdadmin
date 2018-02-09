import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
//import { UserService } from '../services/user.service';

@Component({
	selector: 'showmodelo',
	templateUrl: '../views/showmodelo.html'/*,
	providers: [UserService]*/
})
export class ShowmodeloComponent implements OnInit{
	public title: string;
	//public user;
	//public identity;
	//public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		//private _userService: UserService
	){
		this.title = 'Datos del modelo';

	}

	ngOnInit(){
		console.log('El componente showmodelo.component ha sido cargado!!');

	}

}	
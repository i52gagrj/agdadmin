import { Component, OnInit, EventEmitter, NgZone, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { RutasDeArchivosService } from '../rutas-de-archivos.service';
//import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { UserService } from '../services/user.service';

@Component({
	selector: 'documento',
	templateUrl: '../views/documento.html',
	providers: [UserService]
})
export class DocumentoComponent implements OnInit {
	public title: string;
	public user;
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		// private _userService: UserService
	) {
		this.title = 'Documentos';

	}

	ngOnInit() {
		console.log('El componente documento.component ha sido cargado!!');
		console.log('A por el bote!!!');

	}
}

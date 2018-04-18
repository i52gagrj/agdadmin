import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class MensajeService{
	public url: string;
	//public identity;
	//public token;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}
	
    create(token, mensaje) {
		let json = JSON.stringify(mensaje);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		
		return this._http.post(this.url+'/mensaje/new', params).map(res => res.json());
	}	
	
	getMensajes(token, page = null){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/mensaje/listall?page='+page , params, {headers: headers}).map(res => res.json());
    }	
}	
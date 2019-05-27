import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';
import { NullAstVisitor } from '@angular/compiler';

@Injectable()
export class SesionService{
	public url: string;
	//public identity;
	//public token;
	
	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}
 	
	getSesiones(token, id){
		let params;

		if(id){
			params = "authorization="+token+"&id="+id;
		}else{
			params = "authorization="+token;
		}
		
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/sesion/listall', params, {headers: headers}).map(res => res.json());
    }	

}
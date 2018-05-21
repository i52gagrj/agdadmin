import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class ModeloService{
	public url: string;
	//public identity;
	//public token;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}
	
    create(token, modelo, file) {
		let json = JSON.stringify(modelo);

		const formData = new FormData;		
		formData.append('authorization', token);
		formData.append('json', json);
		formData.append('file', file);
				
		return this._http.post(this.url+'/modelo/new', formData).map(res => res.json());		
	}	
	
	getModelos(token, id, page = null){
		let params;

		if(id){
			params = "authorization="+token+"&id="+id;
		}else{
			params = "authorization="+token;
		}		
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/modelo/listall?page='+page , params, {headers: headers}).map(res => res.json());
    }	
}	
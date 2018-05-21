import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class DescargaService{
	public url: string;
	//public identity;
	//public token;
	
	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}
 	
	getDescargas(token, id, page = null){
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

		return this._http.post(this.url+'/descarga/listall?page='+page , params, {headers: headers}).map(res => res.json());
    }	

}
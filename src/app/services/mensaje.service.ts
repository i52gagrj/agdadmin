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
		
		return this._http.post(this.url+'/mensaje/new', params, {headers: headers}).map(res => res.json());
	}			
	
	getMensajes(token, id){
		let params;

		if(id){
			params = "authorization="+token+"&id="+id;
		}else{
			params = "authorization="+token;
		}
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/mensaje/listall', params, {headers: headers}).map(res => res.json());
	}	
	
	getNuevosMensajes(token){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		/*if(page == null) {
			page=1;
		}*/

		return this._http.post(this.url+'/mensaje/listnew', params, {headers: headers}).map(res => res.json());
	}

	cambiarEstado(token,id,estado){
		if(estado==true){
			estado = 1;
		}
		if(estado == false){
			estado = 0;
		}	
		let params = "authorization="+token+"&id="+id+"&estado="+estado;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'/mensaje/cambiarestado', params, {headers: headers}).map(res => res.json());
	}

}	
import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class DocumentoService{
	public url: string;
	//public identity;
	//public token;
	
	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}
	
	getDocumentos(token, id, page = null){
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

		return this._http.post(this.url+'/documento/listall?page='+page , params, {headers: headers}).map(res => res.json());
	}	
	
	getDocumentosNuevos(token, id, page = null){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/documento/listnew?page='+page , params, {headers: headers}).map(res => res.json());
    }	
	
	//Version para admin
	/*getDocumentos(token, id, page = null){
		let params = "authorization="+token+"&id="+id;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/documento/listall?page='+page , params, {headers: headers}).map(res => res.json());
    }*/

    getDocumento(token, id){
		let params = "authorization="+token+"&id="+id;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});		
		
		return this._http.post(this.url+'/documento/returnone', params, {responseType: ResponseContentType.Blob, headers: headers}).map(res => res.json());
	}
	
	borrarDocumento(token, id){        
        let params = "authorization="+token+"&id="+id;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this._http.post(this.url+'/documento/delete', params, {headers: headers}).map(res => res.json());
    }
}
	
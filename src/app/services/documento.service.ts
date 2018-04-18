import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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

    create(token, documento, file) {
		let json = JSON.stringify(documento);
		let params = "json="+json+"&authorization="+token+"&file="+file;
		//let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		//return this._http.post(this.url+'/documento/new', params, {headers: headers}).map(res => res.json());
		return this._http.post(this.url+'/documento/new', params).map(res => res.json());
	}	
	
	getDocumentos(token, page = null){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/documento/listall?page='+page , params, {headers: headers}).map(res => res.json());
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

    /*getDocumento(token, id){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		
		return this._http.post(this.url+'/documento/returnone/'+id , params, {headers: headers}).map(res => res.json());
	}*/
	
	/*deleteTask(token, id){
        //console.log("Has dado click a borrar");
        let params = "authorization="+token;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this._http.post(this.url+'/task/remove/'+id , params, {headers: headers}).map(res => res.json());
    }*/
}
	
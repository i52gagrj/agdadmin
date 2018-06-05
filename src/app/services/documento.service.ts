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
	
	getDocumentos(token, id){
		let params;

		if(id){
			params = "authorization="+token+"&id="+id;
		}else{
			params = "authorization="+token;
		}
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/documento/listall', params, {headers: headers}).map(res => res.json());
	}	
	
	getDocumentosNuevos(token){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/documento/listnew', params, {headers: headers}).map(res => res.json());
	}
	
	getDocumentosPrueba(token){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/documento/listprueba', params, {headers: headers}).map(res => res.json());
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
	
	cambiarEstado(token,id,estado){
		if(estado==true){
			estado = 1;
		}
		if(estado == false){
			estado = 0;
		}	
		let params = "authorization="+token+"&id="+id+"&estado="+estado;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'/documento/cambiarestado', params, {headers: headers}).map(res => res.json());
	}	
}
	
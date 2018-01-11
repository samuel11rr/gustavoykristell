import { Injectable } from '@angular/core';
import { ConstantesService } from './constantes.service';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor( private _http:Http,
               private _constantes:ConstantesService ) {}

  api: string = this._constantes.api();

  login( datos ){
   let url = `${ this.api }/usuario`;
   let headers = new Headers({
     'Content-Type':'aplication/json'
   });
   return this._http.post( url, datos, {headers} )
              .map( res => {
                return res.json();
              })
              .catch(this.handleError);
  }

  getCategorias(){
    let url = `${ this.api }/getCategorias`;

    return this._http.get( url )
               .map( res => {
                 return res.json();
               });
  }

  getArticulos(){
    let url = `${ this.api }/getArticulos`;

    return this._http.get( url )
               .map( res => {
                 return res.json();
               });
  }

  guardaArticulo( datos ){
   let url = `${ this.api }/articulo`;
   let headers = new Headers({
     'Content-Type':'aplication/json'
   });
   return this._http.post( url, datos, {headers} )
              .map( res => {
                return res.json();
              })
              .catch(this.handleError);
  }

  apartaArticulo( datos ){
    let url = `${ this.api }/donador`;
    let headers = new Headers({
      'Content-Type':'aplication/json'
    });
    return this._http.post( url, datos, {headers} )
               .map( res => {
                 return res.json();
               })
               .catch(this.handleError);
  }

  eliminaArticulo( datos ){
   let url = `${ this.api }/delArticulo`;
   let headers = new Headers({
     'Content-Type':'aplication/json'
   });
   return this._http.post( url, datos, {headers} )
              .map( res => {
                return res.json();
              })
              .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }
}

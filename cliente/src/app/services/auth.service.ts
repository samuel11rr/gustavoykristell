import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor( private router:Router,
               private _http:Http) {}

  checkSession(){
    //verificamos si hay credenciales almacenadas
    //en sessionStorage cuando se inicia session
    //en localStorage cuando se elige recordar al usuario
   if ( sessionStorage.getItem('usuario') || localStorage.getItem('usuario') ) {
       //si habia credenciales almacenadas las copiamos al sessionStorage
       if ( localStorage.getItem('usuario') ) {
           if ( JSON.parse( localStorage.getItem('usuario') )[0].success === true) {
              sessionStorage.setItem('usuario',JSON.stringify( JSON.parse(localStorage.getItem('usuario'))));
           }
       }

       if ( JSON.parse(sessionStorage.getItem('usuario'))[0].success === true ) {
           return true;
       }
   } else{
       return false;
     }
   }

   logout(){
     sessionStorage.clear();
     localStorage.clear();
   }
}

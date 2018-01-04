import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ConstantesService } from '../../services/constantes.service';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  colors:any;
  tiempo:any;
  fechaBoda:string = '3 de marzo de 2018 - 17:30 hrs.';

  constructor( private _constantes: ConstantesService,
               private _auth: AuthService ) {
                 
    $(document).ready(function(){
      $('.parallax').parallax();
    });

    this.colors = this._constantes.colors();
  }

  ngOnInit() {
    this.actualizaRestante();
  }

  actualizaRestante(){
    setTimeout(() => {
      this.tiempo = this._constantes.tiempo();
      this.actualizaRestante();
      // console.log(this.tiempo);
    }, 1000);
  }

  sesion(){
    return this._auth.checkSession();
  }

}

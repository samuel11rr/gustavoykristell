import { Component, OnInit } from '@angular/core';
import { ConstantesService } from '../../services/constantes.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  colors:any;
  tiempo:any;
  fechaBoda:string = '3 de marzo de 2018 - 17:30 hrs.';

  constructor( private _constantes: ConstantesService ) {
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

}

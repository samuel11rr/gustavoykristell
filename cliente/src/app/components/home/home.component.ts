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
  fechaBoda:string = '3 de marzo de 2018';

  constructor( private _constantes: ConstantesService ) {
    $(document).ready(function(){
      $('.parallax').parallax();
    });

    this.colors = this._constantes.colors();
    this.tiempo = this._constantes.tiempo();
  }

  ngOnInit() {
    console.log(this.tiempo);
  }

}

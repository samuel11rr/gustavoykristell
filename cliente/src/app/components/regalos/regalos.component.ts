import { Component, OnInit } from '@angular/core';
import { ConstantesService } from '../../services/constantes.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

declare var $: any;

@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html'
})
export class RegalosComponent implements OnInit {
  recamara: boolean = false;
  sala: boolean = false;
  cocina: boolean = false;
  otros: boolean = false;
  editor: boolean = false;

  categorias:any = [];

  constructor( private _auth: AuthService,
               private _api: ApiService ) {

    this.categorias = this._api.getCategorias();

    $(document).ready(function(){
      $('.parallax').parallax();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  }

  ngOnInit() {
    console.log(this.categorias);
  }

  sesion(){
    return this._auth.checkSession();
  }

  mostrarEditor(){
    this.editor = !this.editor;
  }

  ctrlRecamara(){
    this.recamara   = !this.recamara;
    this.sala       = false;
    this.cocina     = false;
    this.otros      = false;
  }

  ctrlSala(){
    this.sala       = !this.sala;
    this.recamara   = false;
    this.cocina     = false;
    this.otros      = false;
  }

  ctrlCocina(){
    this.cocina     = !this.cocina;
    this.recamara   = false;
    this.sala       = false;
    this.otros      = false;
  }

  ctrlOtros(){
    this.otros      = !this.otros;
    this.recamara   = false;
    this.sala       = false;
    this.cocina     = false;
  }
}

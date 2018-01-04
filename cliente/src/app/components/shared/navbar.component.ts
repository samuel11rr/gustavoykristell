import { Component, OnInit } from '@angular/core';
import { ConstantesService } from '../../services/constantes.service';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  colors:any;

  constructor( private _constantes: ConstantesService,
               private _auth: AuthService ) {

    this.colors = this._constantes.colors();

  }

  ngOnInit() {
  }

  sesion(){
    return this._auth.checkSession();
  }

}

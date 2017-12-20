import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ConstantesService } from '../../services/constantes.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  colors:any;
  constructor( private _constantes: ConstantesService ) {
    this.colors = this._constantes.colors();

  }

  ngOnInit() {
  }

}

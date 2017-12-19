import { Component, OnInit } from '@angular/core';
import { ConstantesService } from '../../services/constantes.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  colors:any;
  constructor( private _constantes: ConstantesService ) {
    this.colors = this._constantes.colors();
  }

  ngOnInit() {
  }

}

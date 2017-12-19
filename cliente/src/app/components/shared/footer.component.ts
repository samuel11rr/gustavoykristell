import { Component, OnInit } from '@angular/core';
import { ConstantesService } from '../../services/constantes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  colors:any;
  constructor( private _constantes: ConstantesService ) {
    this.colors = this._constantes.colors();
  }

  ngOnInit() {
  }

}

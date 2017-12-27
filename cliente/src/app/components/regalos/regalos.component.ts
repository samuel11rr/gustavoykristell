import { Component, OnInit } from '@angular/core';

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

  constructor() {
    $(document).ready(function(){
      $('.parallax').parallax();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  }

  ngOnInit() {
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

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html'
})
export class RegalosComponent implements OnInit {

  constructor() {
    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }

  ngOnInit() {
  }

}

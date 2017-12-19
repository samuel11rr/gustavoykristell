import { Injectable } from '@angular/core';

@Injectable()
export class ConstantesService {
  apiUrl:string = null;

  colores = {
    navbar: 'light-blue darken-4',
    navbarText: 'cyan-text lighten-5',
    principal: null,
    secundario: null,
    resaltado: null,
    link: null,
    footer: 'teal',
    footerPrimary: 'lime-text',
    footerSecondary: 'red-text',
    footerLink: 'orange-text'
  }
  constructor() { }

  api(){
    return this.apiUrl;
  }

  colors(){
    return this.colores;
  }
}

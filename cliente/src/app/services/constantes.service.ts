import { Injectable } from '@angular/core';

@Injectable()
export class ConstantesService {
  apiUrl:string = null;

  colores = {
    navbar: 'teal accent-1',
    navbarText: 'white-text',
    navbarLink: 'teal-text accent-4',
    principal: null,
    secundario: null,
    resaltado: null,
    link: null,
    footer: 'blue-grey lighten-1',
    footerPrimary: 'white-text',
    footerSecondary: 'grey-text text-lighten-4',
    footerLink: 'grey-text text-lighten-3'
  }
  constructor() { }

  api(){
    return this.apiUrl;
  }

  colors(){
    return this.colores;
  }
}

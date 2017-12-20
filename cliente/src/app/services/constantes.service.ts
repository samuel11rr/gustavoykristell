import { Injectable } from '@angular/core';

@Injectable()
export class ConstantesService {
  apiUrl:string = null;

  colores = {
    navbar: 'teal accent-1',
    navbarText: 'teal-text accent-4',
    navbarLink: 'teal-text accent-4',
    principal: null,
    secundario: null,
    resaltado: null,
    link: null,
    footer: 'brown lighten-1',
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

  tiempo(){
    let faltante = {
      finalDate: new Date('2018-03-03 17:30:00'),
      today: new Date(),
      days: 0,
      hours: 0,
      minuts: 0,
      seconds: 0,
      diferencia: 0,
    }

    if ( faltante.finalDate > faltante.today) {
      faltante.diferencia=(faltante.finalDate.getTime()-faltante.today.getTime())/1000;
      faltante.days=Math.floor(faltante.diferencia/86400);//60*60*24
      faltante.diferencia=faltante.diferencia-(86400*faltante.days);
      faltante.hours=Math.floor(faltante.diferencia/3600);
      faltante.diferencia=faltante.diferencia-(3600*faltante.hours);
      faltante.minuts=Math.floor(faltante.diferencia/60);
      faltante.diferencia=faltante.diferencia-(60*faltante.minuts);
      faltante.seconds=Math.floor(faltante.diferencia);

      return faltante;
    } else{

    }
    // return [finalDate, today];
  }
}

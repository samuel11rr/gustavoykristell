import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ConstantesService } from '../../services/constantes.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

declare var $: any;

@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.component.html'
})
export class RegalosComponent implements OnInit {
  articulosForm:FormGroup;
  donadorForm:FormGroup;

  recamara: boolean = false;
  sala: boolean = false;
  cocina: boolean = false;
  otros: boolean = false;
  editor: boolean = false;
  categoria : number = 0;

  buscando: boolean = false;
  trabajando: boolean = false;

  categorias:any = [];
  articulos:any = [];

  img:any =  {
    filename: null,
    filetype: null,
    value: null
  }

  porApartar:any = {};

  constructor( private _auth: AuthService,
               private _api: ApiService ) {
    this.categorias = this._api.getCategorias();

    $(document).ready(function(){
      $('.parallax').parallax();
      $("html, body").animate({ scrollTop: 0 }, "slow");
      // $('.materialboxed').materialbox();
      // $('#textarea1').trigger('autoresize');
      $('.modal').modal();
    });

    this.articulosForm = new FormGroup({
      'categoria': new FormControl( 0, [
                                         Validators.required,
                                         Validators.min(1)
                                        ]),
      'nombre': new FormControl( '', [
                                      Validators.minLength(3),
                                      Validators.required
                                     ]),
      'descripcion': new FormControl( '', []),
      'enlace': new FormControl( '', []),
      'imagen': new FormControl( null, []),
       // 'remember': new FormControl(false),
    });

    this.donadorForm = new FormGroup({
      'nombre': new FormControl( null, [
                                      Validators.minLength(3),
                                      Validators.required
                                     ])
    });
  }

  ngOnInit() {
    this.getCategorias();
    this.getArticulos();
  }

  getCategorias(){
    // this.buscando = true;
    this._api.getCategorias()
              .subscribe( data => {
                this.categorias = data;
                console.log(this.categorias);
                // this.buscando = false;
              });
  }

  getArticulos(){
    this.buscando = true;
    this._api.getArticulos()
              .subscribe( data => {
                this.articulos = data;
                console.log(this.articulos);
                this.buscando = false;
              });
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
    this.categoria  = 2;
  }

  ctrlSala(){
    this.sala       = !this.sala;
    this.recamara   = false;
    this.cocina     = false;
    this.otros      = false;
    this.categoria  = 1;
  }

  ctrlCocina(){
    this.cocina     = !this.cocina;
    this.recamara   = false;
    this.sala       = false;
    this.otros      = false;
    this.categoria  = 3;
  }

  ctrlOtros(){
    this.otros      = !this.otros;
    this.recamara   = false;
    this.sala       = false;
    this.cocina     = false;
    this.categoria  = 6;
  }

  alSeleccionarArchivo( event ) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // let base64Full = {
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // }

        this.img.filename = file.name;
        this.img.filetype = file.type;

        this.resizeImg( file );
      };
    }
  }

  resizeImg( file ){
    if (document.getElementById('imgNueva')) {
        document.getElementById('imgNueva').remove();
    }
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let maxW = 600;
    let maxH = 600;

    let img = document.createElement('img');
    let imagen;

    img.onload = function(){
      let imgW = img.width;
      let imgH = img.height;

      let scale = Math.min( ( maxW / imgW ), ( maxH / imgH ) );
      let newW = imgW*scale;
      let newH = imgH*scale;

      canvas.width = newW;
      canvas.height = newH;

      context.drawImage( img, 0, 0, newW, newH );

      //creamos la imagen nueva de con la redimension
      imagen = new Image();
      imagen.src = canvas.toDataURL();

      document.body.appendChild(imagen);
      // document.body.innerHTML+=imagen;
      imagen.setAttribute('id', 'imgNueva');
      document.getElementById('imgNueva').style.display = 'none';
      console.log(document.getElementById('imgNueva'));
      //esto solo muestra el base64 de la imagen en el body
      // document.body.innerHTML+=canvas.toDataURL();
    }

    img.src = URL.createObjectURL(file);
    // console.log( canvas.toDataURL() );
    // console.log( img.src );
    // document.body.innerHTML+=img.src;
  }


  guardaArticulo(){
    this.trabajando = true;

    if ( this.img.filename != null ) {
        this.img.value = document.getElementById('imgNueva').getAttribute('src').split(',')[1]
    }

    let datos = {
      categoria: this.articulosForm.controls.categoria.value,
      nombre: this.articulosForm.controls.nombre.value,
      descripcion: this.articulosForm.controls.descripcion.value,
      enlace: this.articulosForm.controls.enlace.value,
      img: this.img,
      usuario: JSON.parse(sessionStorage.getItem('usuario'))[0].USU_username
    }

    this._api.guardaArticulo( datos )
              .subscribe( data => {
                // console.log(data);

                if (data.respuesta === 'correcto') {
                  if (document.getElementById('imgNueva')) {
                      document.getElementById('imgNueva').remove();
                      this.getArticulos();
                  }
                  this.img.value = null;
                  this.img.filename = null;
                  this.img.filetype = null;
                  // console.log(this.img);
                  datos = undefined;
                  // console.log(datos);
                  this.trabajando = false;
                  this.articulosForm.reset();
                } else {
                  alert('hubo un error');
                  this.trabajando = false;
                }
              });
  }

  apartaRegalo( item ){
    this.porApartar = item;
    this.porApartar.mensaje = null;
    $('#modalAparta').modal('open');
  }

  confirmaApartado(){
    this.trabajando = true;
    this.porApartar.donador = this.donadorForm.controls.nombre.value;
    console.log( this.porApartar );

    this._api.apartaArticulo( this.porApartar )
             .subscribe( data => {
               // console.log( data );
               if ( data.respuesta === 1 ) {
                 $('#modalAparta').modal('close');
                 this.getArticulos();
                 this.porApartar = {};
                 this.donadorForm.reset();
                 this.trabajando = false;
               } else {
                 this.trabajando = false;
                 alert('hubo un error');
               };
             });
  }

  eliminaRegalo( item ){
    console.log( item );

    let datos = {
      idArticulo: item.ART_id,
      usuario: JSON.parse(sessionStorage.getItem('usuario'))[0].USU_username,
      img: item.ART_img
    }

    this._api.eliminaArticulo( datos )
              .subscribe( data => {
                console.log( data );
                if (data.respuesta === 1) {
                  this.getArticulos();
                } else{
                  alert('hubo un error');
                }
              });
  }

}

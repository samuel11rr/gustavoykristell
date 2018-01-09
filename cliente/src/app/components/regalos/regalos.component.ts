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
  recamara: boolean = false;
  sala: boolean = false;
  cocina: boolean = false;
  otros: boolean = false;
  editor: boolean = false;

  categorias:any = [];

  articuloNuevo = {
  }

  img:any =  {
    filename: null,
    filetype: null,
    value: null
  }

  constructor( private _auth: AuthService,
               private _api: ApiService ) {
    this.categorias = this._api.getCategorias();

    $(document).ready(function(){
      $('.parallax').parallax();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    this.articulosForm = new FormGroup({
      'categoria': new FormControl( 0, [
                                         Validators.required
                                        ]),
      'nombre': new FormControl( '', [
                                      Validators.minLength(3),
                                      Validators.required
                                     ]),
      'descripcion': new FormControl( '', []),
      'imagen': new FormControl( null, []),
       // 'remember': new FormControl(false),
    });
  }

  ngOnInit() {
    this.getCategorias();
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
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    let maxW = 300;
    let maxH = 300;

    let img = document.createElement('img');
let imagen
    img.onload = function(){
      let imgW = img.width;
      let imgH = img.height;

      let scale = Math.min( ( maxW / imgW ), ( maxH / imgH ) );
      let newW = imgW*scale;
      let newH = imgH*scale;

      canvas.width = newW;
      canvas.height = newH;

      context.drawImage( img, 0, 0, newW, newH );
      // console.log( canvas.toDataURL() );
      // return canvas.toDataURL();
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
    // img.setAttribute('id', 'imgNueva')

    // console.log( canvas.toDataURL() );
    // console.log( img.src );


    // document.body.innerHTML+=img.src;
  }


  guardaArticulo(){
    if ( this.img.filename != null ) {
        this.img.value = document.getElementById('imgNueva').getAttribute('src').split(',')[1]
    }
    // let imagen = {
    //   filename: this.img.filename,
    //   filetype: this.img.filetype,
    //   value: document.getElementById('imgNueva').getAttribute('src').split(',')[1],
    // }

    let datos = {
      img: this.img
    }
    console.log(datos);
    this._api.guardaArticulo( datos )
              .subscribe( data => {
                console.log(data);

                if (data.respuesta === 'correcto') {
                  document.getElementById('imgNueva').remove();
                  this.img.value = null;
                  this.img.filename = null;
                  this.img.filetype = null;
                  console.log(this.img);
                }
              });
  }

}

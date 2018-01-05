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
    let img = document.createElement("img"); //agregado

    let reader = new FileReader();

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64Full = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }

        this.resizeImg( file, base64Full );
        // this.articulosForm.get('imagen').setValue({
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // })
        // console.log(this.articulosForm.get('imagen').value);
      };
    }
  }

  resizeImg( file, base64Full ){
    console.log( file, base64Full );
  }
}

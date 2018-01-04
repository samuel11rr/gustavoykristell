import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ConstantesService } from '../../services/constantes.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  logueo:FormGroup;
  colors:any;
  trabajando: boolean = false;
  usuario:any = [];
  session:boolean = false;

  constructor( private _constantes: ConstantesService,
               private _auth: AuthService,
               private _api: ApiService,
               private router:Router ) {
    this.colors = this._constantes.colors();

    router.events.subscribe( (val) => {
      this.verificaSesion();
    });

    this.logueo = new FormGroup({
      'username': new FormControl( '', [
                                             Validators.minLength(3),
                                             Validators.required
                                            ]),
       'password': new FormControl( '', [
                                             Validators.minLength(3),
                                             Validators.required
                                            ]),
       'remember': new FormControl(false),
    });
  }

  ngOnInit() {
  }

  verificaSesion() {
    this.session = this._auth.checkSession();

    // console.log( this.session );
    if ( this.session === true ) {
        this.usuario = JSON.parse(sessionStorage.getItem('usuario'))[0];
        // console.log(this.usuario);
    }
  }

  cerrarLogueo(){
    this.logueo.reset();
    $('#modalLogin').modal('close');
  }

  enviaCredenciales(){
    this.trabajando = true;

    let credenciales = {
      username: this.logueo.controls.username.value,
      password: this.logueo.controls.password.value,
      remember: this.logueo.controls.remember.value,
    }

    this._api.login( credenciales )
              .subscribe( data =>{
                if (data.length > 0 ) {
                    // console.log(data[0].success);
                    if ( data[0].success === true ) {
                        this.trabajando = false;
                        console.info('bienvenido '+data[0].USU_nombre);

                        sessionStorage.setItem('usuario',JSON.stringify(data));

                        if (credenciales.remember === true) {
                            localStorage.setItem('usuario',JSON.stringify(data));
                        }
                        this.verificaSesion();
                        this.cerrarLogueo();

                        $('#modalWelcome').modal('open');
                        setTimeout(function() {
                          $('#modalWelcome').modal('close');
                        }, 2500);
                    }

                    if ( data[0].success === false ) {
                      this.trabajando = false;
                      alert('Usuario o contraseña incorrectos');
                    }
                } else {
                  alert("Acceso denegado");
                }
              },
              (error) => {
                this.trabajando = false;
                alert('Intentelo más tarde (Error '+ error.status +').');
                // console.log(error);
                this.cerrarLogueo();
              })
  }

  logout(){
    // this.trabajando=true;

    this._auth.logout();
    this.verificaSesion();

    setTimeout(function() {
      $('#modalSalir').modal('close');
      // this.trabajando=false;
    }, 500);
  }

}

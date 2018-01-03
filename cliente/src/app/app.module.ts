import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LOCALE_ID } from '@angular/core';

// SERVICIOS
import { ConstantesService } from './services/constantes.service';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';

//RUTAS
import { APP_ROUTING } from './app.routes';

// COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar.component';
import { FooterComponent } from './components/shared/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegalosComponent } from './components/regalos/regalos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegalosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "esMX" },
    ConstantesService,
    AuthService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

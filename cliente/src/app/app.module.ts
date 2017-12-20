import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// SERVICIOS
import { ConstantesService } from './services/constantes.service';

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
    APP_ROUTING
  ],
  providers: [
    ConstantesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

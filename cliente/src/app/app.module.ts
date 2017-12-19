import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// SERVICIOS
import { ConstantesService } from './services/constantes.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar.component';
import { FooterComponent } from './components/shared/footer.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ConstantesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

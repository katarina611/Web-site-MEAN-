import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PocComponent } from './poc/poc.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { LoginComponent } from './login/login.component';
import { DoktorComponent } from './doktor/doktor.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { NovalozComponent } from './novaloz/novaloz.component';
import { StranicaLekaraComponent } from './stranica-lekara/stranica-lekara.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerLogInComponent } from './menadzer-log-in/menadzer-log-in.component';
@NgModule({
  declarations: [
    AppComponent,
    PocComponent,
    RegistracijaComponent,
    LoginComponent,
    DoktorComponent,
    PacijentComponent,
    NovalozComponent,
    StranicaLekaraComponent,
    MenadzerComponent,
    MenadzerLogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

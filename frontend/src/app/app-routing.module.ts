import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PocComponent } from './poc/poc.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DoktorComponent } from './doktor/doktor.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { NovalozComponent } from './novaloz/novaloz.component';
import { StranicaLekaraComponent } from './stranica-lekara/stranica-lekara.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerLogInComponent } from './menadzer-log-in/menadzer-log-in.component';

const routes: Routes = [
  { path: '', component: PocComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegistracijaComponent },
  { path: 'doktor', component: DoktorComponent },
  { path: 'pacijent', component: PacijentComponent },
  { path: 'nova', component: NovalozComponent },
  { path:'stranicaLekara', component:StranicaLekaraComponent},
  { path:"mng", component:MenadzerLogInComponent},
  { path:"menadzerLogedIn", component:MenadzerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

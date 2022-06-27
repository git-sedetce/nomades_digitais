import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';

const APP_ROUTES: Routes = [
  { path: 'ceara_pronto', component: Ceara_prontoComponent},
  { path: 'cadastro_municipio', component: CadastroMunicipioComponent},
  { path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRounting {}

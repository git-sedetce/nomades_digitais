import { EditarNomadComponent } from './cadastro-nomad/editar-nomad/editar-nomad.component';
import { VistoNomadeComponent } from './dicas/visto-nomade/visto-nomade.component';
import { CpfEstrangeiroComponent } from './dicas/cpf-estrangeiro/cpf-estrangeiro.component';
import { ProximaParadaComponent } from './proxima-parada/proxima-parada.component';
import { ManualComponent } from './manual/manual.component';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';
import { O_que_eComponent } from './o_que_e/o_que_e.component';
import { SeloComponent } from './selo/selo.component';

const APP_ROUTES: Routes = [

  { path: 'ceara_pronto', component: Ceara_prontoComponent },
  { path: 'o_que_e', component: O_que_eComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'selo', component: SeloComponent },
  { path: 'cadastro_municipio', component: CadastroMunicipioComponent },
  { path: 'cadastro_parceiro', component: CadastroParceiroComponent },
  { path: 'cadastro_nomad', component: CadastroNomadComponent },
  { path: 'editar_nomad', component: EditarNomadComponent },
  { path: 'proxima_parada', component: ProximaParadaComponent },
  { path: 'cpf_estrangeiro', component: CpfEstrangeiroComponent },
  { path: 'visto_nomade', component: VistoNomadeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRounting {}

import { EditarNomadComponent } from './cadastro-nomad/editar-nomad/editar-nomad.component';
import { VistoNomadeComponent } from './dicas/visto-nomade/visto-nomade.component';
import { CpfEstrangeiroComponent } from './dicas/cpf-estrangeiro/cpf-estrangeiro.component';
import { ManualComponent } from './manual/manual.component';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { SeloComponent } from './selo/selo.component';
import { EditarDadosComponent } from './edit/editar-dados/editar-dados.component';
import { EditarNomadsComponent } from './edit/editar-nomads/editar-nomads.component';

const APP_ROUTES: Routes = [

  { path: 'manual', component: ManualComponent },
  { path: 'selo', component: SeloComponent },
  { path: 'cadastro_nomad', component: CadastroNomadComponent },
  { path: 'editar_nomad', component: EditarNomadComponent },
  { path: 'cpf_estrangeiro', component: CpfEstrangeiroComponent },
  { path: 'visto_nomade', component: VistoNomadeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'editar', component: EditarDadosComponent },
  { path: 'editarNomad', component: EditarNomadsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //Módulo Municipio
  { path: 'municipio', loadChildren:() => import('./municipio/municipio.module').then(m => m.MunicipioModule) },

  //Módulo Empresas
  { path: 'parceria', loadChildren:() => import('./empresas/empresas.module').then(p => p.EmpresasModule) },

  //Módulo Eventos
  { path: 'eventos', loadChildren:() => import('./eventos/eventos.module').then(ev => ev.EventosModule) },

  //Módulo Users
  { path: 'admin', loadChildren:() => import('./users/users.module').then(usr => usr.UsersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRounting {}

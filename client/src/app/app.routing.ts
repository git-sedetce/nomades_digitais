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
import { LoginComponent } from './user/login/login.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { ResetComponent } from './user/reset/reset.component';
import { guardGuard } from './user/guard/guard.guard';
import { ListaUserComponent } from './user/lista-user/lista-user.component';
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
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent, canActivate: [guardGuard], data: { roles: ['admin'] } },
  { path: 'user', component: ListaUserComponent, canActivate: [guardGuard], data: { roles: ['admin'] } },
  { path: 'resetSenha', component: ResetComponent },
  { path: 'editar', component: EditarDadosComponent },
  { path: 'editarNomad', component: EditarNomadsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //Módulo Municipio
  { path: 'municipio', loadChildren:() => import('./municipio/municipio.module').then(m => m.MunicipioModule) },

  //Módulo Empresas
  { path: 'parceria', loadChildren:() => import('./empresas/empresas.module').then(p => p.EmpresasModule) },

  //Módulo Eventos
  { path: 'eventos', loadChildren:() => import('./eventos/eventos.module').then(ev => ev.EventosModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRounting {}

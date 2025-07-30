import { EditarNomadComponent } from './cadastro-nomad/editar-nomad/editar-nomad.component';
import { VistoNomadeComponent } from './dicas/visto-nomade/visto-nomade.component';
import { CpfEstrangeiroComponent } from './dicas/cpf-estrangeiro/cpf-estrangeiro.component';
import { ManualComponent } from './manual/manual.component';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { O_que_eComponent } from './o_que_e/o_que_e.component';
import { SeloComponent } from './selo/selo.component';
import { EmpresasParceirasComponent } from './view/empresas-parceiras/empresas-parceiras.component';
import { EditarParceiroComponent } from './edit/editar-parceiro/editar-parceiro.component';
import { LoginComponent } from './user/login/login.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { ResetComponent } from './user/reset/reset.component';
import { guardGuard } from './user/guard/guard.guard';
import { ListaUserComponent } from './user/lista-user/lista-user.component';
import { EditarDadosComponent } from './edit/editar-dados/editar-dados.component';
import { EditarNomadsComponent } from './edit/editar-nomads/editar-nomads.component';
import { CadastroEventosComponent } from './cadastro-eventos/cadastro-eventos.component';
import { TipoTurismoComponent } from './tipo-turismo/tipo-turismo.component';
import { CadastroTemporadaNomadComponent } from './cadastro-temporada-nomad/cadastro-temporada-nomad.component';
import { TemporadaNomadComponent } from './temporada-nomad/temporada-nomad.component';

const APP_ROUTES: Routes = [

  { path: 'o_que_e', component: O_que_eComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'selo', component: SeloComponent },
  { path: 'cadastro_parceiro', component: CadastroParceiroComponent },
  { path: 'cadastro_nomad', component: CadastroNomadComponent },
  { path: 'cadastro_eventos', component: CadastroEventosComponent },
  { path: 'cadastro_temporada', component: CadastroTemporadaNomadComponent },
  { path: 'editar_nomad', component: EditarNomadComponent },
  { path: 'tipo_turismo', component: TipoTurismoComponent },
  { path: 'cpf_estrangeiro', component: CpfEstrangeiroComponent },
  { path: 'visto_nomade', component: VistoNomadeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'parceria', component: EmpresasParceirasComponent },
  { path: 'editarparceria', component: EditarParceiroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent, canActivate: [guardGuard], data: { roles: ['admin'] } },
  { path: 'user', component: ListaUserComponent, canActivate: [guardGuard], data: { roles: ['admin'] } },
  { path: 'resetSenha', component: ResetComponent },
  { path: 'editar', component: EditarDadosComponent },
  { path: 'editarNomad', component: EditarNomadsComponent },
  { path: 'temporadaNomad', component: TemporadaNomadComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //Módulo Municipio

  { path: 'municipio', loadChildren:() => import('./municipio/municipio.module').then(m => m.MunicipioModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRounting {}

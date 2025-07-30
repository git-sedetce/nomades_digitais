
import { VistoNomadeComponent } from './dicas/visto-nomade/visto-nomade.component';
import { CpfEstrangeiroComponent } from './dicas/cpf-estrangeiro/cpf-estrangeiro.component';
import { ManualComponent } from './manual/manual.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [

  { path: 'manual', component: ManualComponent },
  { path: 'cpf_estrangeiro', component: CpfEstrangeiroComponent },
  { path: 'visto_nomade', component: VistoNomadeComponent },
  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //Módulo Municipio
  { path: 'municipio', loadChildren:() => import('./municipio/municipio.module').then(m => m.MunicipioModule) },

  //Módulo Empresas
  { path: 'parceria', loadChildren:() => import('./empresas/empresas.module').then(p => p.EmpresasModule) },

  //Módulo Nomads
  { path: 'nomad', loadChildren:() => import('./nomads/nomads.module').then(nms => nms.NomadsModule) },

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

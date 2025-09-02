import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacoesGeraisComponent } from './informacoes-gerais/informacoes-gerais.component';
import { PerfilEstadoComponent } from './perfil-estado/perfil-estado.component';
import { HubInovacaoComponent } from './hub-inovacao/hub-inovacao.component';
import { AeroportosComponent } from './aeroportos/aeroportos.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'informacoes',
    component: InformacoesGeraisComponent,
  },
  {
    path: 'perfil',
    component: PerfilEstadoComponent,
  },
  {
    path: 'hub',
    component: HubInovacaoComponent,
  },
  {
    path: 'aeroportos',
    component: AeroportosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CearaAtrativoRoutingModule { }

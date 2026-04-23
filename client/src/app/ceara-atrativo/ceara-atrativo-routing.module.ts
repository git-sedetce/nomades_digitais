import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacoesGeraisComponent } from './informacoes-gerais/informacoes-gerais.component';
import { PerfilEstadoComponent } from './perfil-estado/perfil-estado.component';
import { HubInovacaoComponent } from './hub-inovacao/hub-inovacao.component';
import { AeroportosComponent } from './aeroportos/aeroportos.component';
import { DestinoComponent } from './destino/destino.component';
import { ConhecaCearaComponent } from './conheca-ceara/conheca-ceara.component';

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
  {
    path: 'destino',
    component: DestinoComponent,
  },
  {
    path: 'knowce',
    component: ConhecaCearaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CearaAtrativoRoutingModule { }

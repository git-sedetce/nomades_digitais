import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CearaAtrativoRoutingModule } from './ceara-atrativo-routing.module';
import { InformacoesGeraisComponent } from './informacoes-gerais/informacoes-gerais.component';
import { PerfilEstadoComponent } from './perfil-estado/perfil-estado.component';
import { HubInovacaoComponent } from './hub-inovacao/hub-inovacao.component';
import { AeroportosComponent } from './aeroportos/aeroportos.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    InformacoesGeraisComponent,
    PerfilEstadoComponent,
    HubInovacaoComponent,
    AeroportosComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CearaAtrativoRoutingModule
  ]
})
export class CearaAtrativoModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';
import { ProximaParadaComponent } from './proxima-parada/proxima-parada.component';

const routes: Routes = [
  {
    path: 'cadastro_municipio',
    component: CadastroMunicipioComponent
  },
  {
    path: 'ceara_pronto',
    component: Ceara_prontoComponent
  },
  {
    path: 'proxima_parada',
    component: ProximaParadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemporadaNomadComponent } from './temporada-nomad/temporada-nomad.component';
import { CadastroTemporadaNomadComponent } from './cadastro-temporada-nomad/cadastro-temporada-nomad.component';
import { CadastroEventosComponent } from './cadastro-eventos/cadastro-eventos.component';
import { ProximaParadaComponent } from './proxima-parada/proxima-parada.component';

const routes: Routes = [
  {
    path: 'cadastro_eventos',
    component: CadastroEventosComponent,
  },
  {
    path: 'cadastro_temporada',
    component: CadastroTemporadaNomadComponent,
  },
  {
    path: 'temporadaNomad',
    component: TemporadaNomadComponent,
  },
  {
    path: 'proxima_parada',
    component: ProximaParadaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosRoutingModule {}

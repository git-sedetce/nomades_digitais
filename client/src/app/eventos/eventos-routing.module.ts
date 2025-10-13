import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemporadaNomadComponent } from './temporada-nomad/temporada-nomad.component';
import { CadastroTemporadaNomadComponent } from './cadastro-temporada-nomad/cadastro-temporada-nomad.component';
import { CadastroEventosComponent } from './cadastro-eventos/cadastro-eventos.component';
import { ProximaParadaComponent } from './proxima-parada/proxima-parada.component';
import { GastronomiaComponent } from './gastronomia/gastronomia.component';
import { guardGuard } from '../users/guard/guard.guard';

const routes: Routes = [
  {
    path: 'cadastro_eventos',
    canActivate: [guardGuard],
    data: { roles: ['admin', 'user_comunity', 'user_municipio'] },
    component: CadastroEventosComponent,
  },
  {
    path: 'cadastro_temporada',
    canActivate: [guardGuard],
    data: { roles: ['admin'] },
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
  {
    path: 'gastronomia',
    component: GastronomiaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosRoutingModule {}

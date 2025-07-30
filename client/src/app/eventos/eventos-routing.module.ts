import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemporadaNomadComponent } from './temporada-nomad/temporada-nomad.component';
import { CadastroTemporadaNomadComponent } from './cadastro-temporada-nomad/cadastro-temporada-nomad.component';
import { CadastroEventosComponent } from './cadastro-eventos/cadastro-eventos.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosRoutingModule {}

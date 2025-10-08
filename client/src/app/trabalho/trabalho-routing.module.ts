import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastraVagaComponent } from './cadastra-vaga/cadastra-vaga.component';
import { VerVagaComponent } from './ver-vaga/ver-vaga.component';
import { VerTalentosComponent } from './ver-talentos/ver-talentos.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cadastra',
    component: CadastraVagaComponent,
  },
  {
    path: 'vervaga',
    component: VerVagaComponent,
  },
  {
    path: 'vertalento',
    component: VerTalentosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabalhoRoutingModule {}

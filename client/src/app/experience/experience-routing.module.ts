import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CriarExperienceComponent } from './criar-experience/criar-experience.component';
import { CadastrarExperienceComponent } from './cadastrar-experience/cadastrar-experience.component';
import { VerParticipantesComponent } from './ver-participantes/ver-participantes.component';

const routes: Routes = [
   {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'create',
      component: CriarExperienceComponent,
    },
    {
      path: 'cadastro',
      component: CadastrarExperienceComponent,
    },
    {
      path: 'paritipantes',
      component: VerParticipantesComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule { }

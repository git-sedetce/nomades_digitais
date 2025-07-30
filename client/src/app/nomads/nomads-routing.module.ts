import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarNomadsComponent } from './editar-nomads/editar-nomads.component';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';

const routes: Routes = [
  {
      path: 'cadastro_nomad',
      component: CadastroNomadComponent
    },
    {
      path: 'editarNomad',
      component: EditarNomadsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomadsRoutingModule { }

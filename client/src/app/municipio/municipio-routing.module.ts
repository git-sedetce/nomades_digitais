import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';
import { TipoTurismoComponent } from './tipo-turismo/tipo-turismo.component';
import { DetalhesMunicipioComponent } from './detalhes-municipio/detalhes-municipio.component';

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
    path: 'tipo_turismo',
    component: TipoTurismoComponent
  },
  {
    path: 'tipo-turismo/detalhes/:id',
    component: DetalhesMunicipioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }

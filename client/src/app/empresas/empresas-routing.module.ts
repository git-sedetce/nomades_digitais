import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasParceirasComponent } from './empresas-parceiras/empresas-parceiras.component';
import { EditarParceiroComponent } from './editar-parceiro/editar-parceiro.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { EditarDadosComponent } from './editar-dados/editar-dados.component';

const routes: Routes = [
  {
      path: 'cadastro_parceiro',
      component: CadastroParceiroComponent
    },
    {
      path: 'editarparceria',
      component: EditarParceiroComponent
    },
    {
      path: 'parceria',
      component: EmpresasParceirasComponent
    },
    {
      path: 'editar',
      component: EditarDadosComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }

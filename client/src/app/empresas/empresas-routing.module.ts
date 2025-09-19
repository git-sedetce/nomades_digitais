import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasParceirasComponent } from './empresas-parceiras/empresas-parceiras.component';
import { EditarParceiroComponent } from './editar-parceiro/editar-parceiro.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { EditarDadosComponent } from './editar-dados/editar-dados.component';
import { OndeFicarComponent } from './onde-ficar/onde-ficar.component';
import { HospedagemComponent } from './hospedagem/hospedagem.component';
import { WorkEnvironmentComponent } from './work-environment/work-environment.component';
import { InfoCompanyComponent } from './info-company/info-company.component';

const routes: Routes = [
  {
    path: 'cadastro_parceiro',
    component: CadastroParceiroComponent,
  },
  {
    path: 'editarparceria',
    component: EditarParceiroComponent,
  },
  {
    path: 'parceria',
    component: EmpresasParceirasComponent,
  },
  {
    path: 'editar',
    component: EditarDadosComponent,
  },
  {
    path: 'home',
    component: OndeFicarComponent,
  },
  {
    path: 'hospedagem',
    component: HospedagemComponent,
  },
  {
    path: 'ambiente',
    component: WorkEnvironmentComponent,
  },
  {
    path: 'info',
    component: InfoCompanyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresasRoutingModule {}

import { EditarParceiroComponent } from './editar-parceiro/editar-parceiro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { EmpresasParceirasComponent } from './empresas-parceiras/empresas-parceiras.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { EditarDadosComponent } from './editar-dados/editar-dados.component';
import { OndeFicarComponent } from './onde-ficar/onde-ficar.component';
import { HospedagemComponent } from './hospedagem/hospedagem.component';
import { WorkEnvironmentComponent } from './work-environment/work-environment.component';

@NgModule({
  declarations: [
    CadastroParceiroComponent,
    EmpresasParceirasComponent,
    EditarParceiroComponent,
    EditarDadosComponent,
    OndeFicarComponent,
    HospedagemComponent,
    WorkEnvironmentComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forChild(),
  ],
})
export class EmpresasModule {}

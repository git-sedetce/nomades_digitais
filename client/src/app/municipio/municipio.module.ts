import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipioRoutingModule } from './municipio-routing.module';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { ProximaParadaComponent } from './proxima-parada/proxima-parada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    Ceara_prontoComponent,
    CadastroMunicipioComponent,
    ProximaParadaComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forChild()
  ]
})
export class MunicipioModule { }

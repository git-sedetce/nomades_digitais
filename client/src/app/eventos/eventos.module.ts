import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { CadastroEventosComponent } from './cadastro-eventos/cadastro-eventos.component';
import { CadastroTemporadaNomadComponent } from './cadastro-temporada-nomad/cadastro-temporada-nomad.component';
import { TemporadaNomadComponent } from './temporada-nomad/temporada-nomad.component';

@NgModule({
  declarations: [
    CadastroEventosComponent,
    CadastroTemporadaNomadComponent,
    TemporadaNomadComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forChild(),
  ],
})
export class EventosModule {}

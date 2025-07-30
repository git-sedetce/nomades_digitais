import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomadsRoutingModule } from './nomads-routing.module';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';
import { EditarNomadsComponent } from './editar-nomads/editar-nomads.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    CadastroNomadComponent,
    EditarNomadsComponent,
  ],
  imports: [
    CommonModule,
    NomadsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forChild(),
  ],
})
export class NomadsModule {}

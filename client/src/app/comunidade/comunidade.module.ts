import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunidadeRoutingModule } from './comunidade-routing.module';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    HomeComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    ComunidadeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ]
})
export class ComunidadeModule { }

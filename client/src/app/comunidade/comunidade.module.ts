import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunidadeRoutingModule } from './comunidade-routing.module';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    HomeComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    ComunidadeRoutingModule
  ]
})
export class ComunidadeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunidadeRoutingModule } from './comunidade-routing.module';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HomeCadastroComponent } from './home-cadastro/home-cadastro.component';
import { CadastroEncontroComponent } from './cadastro-encontro/cadastro-encontro.component';
import { CadastroMidiaComponent } from './cadastro-midia/cadastro-midia.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    HomeComponent,
    CadastroComponent,
    HomeCadastroComponent,
    CadastroEncontroComponent,
    CadastroMidiaComponent
  ],
  imports: [
    CommonModule,
    ComunidadeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forChild(),
  ]
})
export class ComunidadeModule { }

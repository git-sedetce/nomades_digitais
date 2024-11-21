import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRounting } from './app.routing';

import { AppComponent } from './app.component';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';
import { HomeComponent } from './home/home.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';
import { O_que_eComponent } from './o_que_e/o_que_e.component';
import { ManualComponent } from './manual/manual.component';
import { SeloComponent } from './selo/selo.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProximaParadaComponent } from './proxima-parada/proxima-parada.component';
import { CpfEstrangeiroComponent } from './dicas/cpf-estrangeiro/cpf-estrangeiro.component';
import { VistoNomadeComponent } from './dicas/visto-nomade/visto-nomade.component';
import { EditarNomadComponent } from './cadastro-nomad/editar-nomad/editar-nomad.component';
import { EmpresasParceirasComponent } from './view/empresas-parceiras/empresas-parceiras.component'
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';
import { EditarParceiroComponent } from './edit/editar-parceiro/editar-parceiro.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LoginComponent } from './user/login/login.component';
import { ResetComponent } from './user/reset/reset.component';
import { ListaUserComponent } from './user/lista-user/lista-user.component';
import { EditarDadosComponent } from './edit/editar-dados/editar-dados.component';
import { EditarNomadsComponent } from './edit/editar-nomads/editar-nomads.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroMunicipioComponent,
      HeaderComponent,
      FooterComponent,
      Ceara_prontoComponent,
      HomeComponent,
      CadastroParceiroComponent,
      CadastroNomadComponent,
      O_que_eComponent,
      ManualComponent,
      SeloComponent,
      ProximaParadaComponent,
      CpfEstrangeiroComponent,
      VistoNomadeComponent,
      EditarNomadComponent,
      EmpresasParceirasComponent,
      EditarParceiroComponent,
      CadastroComponent,
      LoginComponent,
      ResetComponent,
      ListaUserComponent,
      EditarDadosComponent,
      EditarNomadsComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRounting,
    HttpClientModule,
    GoogleMapsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
      SeloComponent
   ],
  imports: [
    BrowserModule,
    AppRounting,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

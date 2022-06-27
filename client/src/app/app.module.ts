import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRounting } from './app.routing'

import { AppComponent } from './app.component';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Ceara_prontoComponent } from './ceara_pronto/ceara_pronto.component';
import { HomeComponent } from './home/home.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { CadastroNomadComponent } from './cadastro-nomad/cadastro-nomad.component';

@NgModule({
  declarations: [			
    AppComponent,
    CadastroMunicipioComponent,
      HeaderComponent,
      FooterComponent,
      Ceara_prontoComponent,
      HomeComponent,
      CadastroParceiroComponent,
      CadastroNomadComponent
   ],
  imports: [
    BrowserModule,
    AppRounting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

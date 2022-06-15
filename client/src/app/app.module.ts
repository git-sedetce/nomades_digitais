import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CadastroMunicipioComponent } from './cadastro-municipio/cadastro-municipio.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroMunicipioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

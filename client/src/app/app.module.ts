import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRounting } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ManualComponent } from './manual/manual.component';
import { SeloComponent } from './selo/selo.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CpfEstrangeiroComponent } from './dicas/cpf-estrangeiro/cpf-estrangeiro.component';
import { VistoNomadeComponent } from './dicas/visto-nomade/visto-nomade.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';
import { EditarDadosComponent } from './edit/editar-dados/editar-dados.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      FooterComponent,
      HomeComponent,
      ManualComponent,
      SeloComponent,
      CpfEstrangeiroComponent,
      VistoNomadeComponent,
      EditarDadosComponent
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
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

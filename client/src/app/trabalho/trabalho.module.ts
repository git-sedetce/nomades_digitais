import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabalhoRoutingModule } from './trabalho-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TrabalhoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forChild(),
  ]
})
export class TrabalhoModule { }

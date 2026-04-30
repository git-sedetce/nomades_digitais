import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { CriarExperienceComponent } from './criar-experience/criar-experience.component';
import { CadastrarExperienceComponent } from './cadastrar-experience/cadastrar-experience.component';

@NgModule({
  declarations: [
    HomeComponent,
    CriarExperienceComponent,
    CadastrarExperienceComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxMaskModule.forChild(),
  ],
})
export class ExperienceModule {}

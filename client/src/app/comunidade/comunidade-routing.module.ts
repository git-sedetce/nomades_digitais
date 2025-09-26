import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeCadastroComponent } from './home-cadastro/home-cadastro.component';
import { CadastroEncontroComponent } from './cadastro-encontro/cadastro-encontro.component';
import { CadastroMidiaComponent } from './cadastro-midia/cadastro-midia.component';

const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'cadastro',
      component: CadastroComponent,
    },
    {
      path: 'homecadastro',
      component: HomeCadastroComponent,
    },
    {
      path: 'cadastroencontro',
      component: CadastroEncontroComponent,
    },
    {
      path: 'cadastromidia',
      component: CadastroMidiaComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunidadeRoutingModule { }

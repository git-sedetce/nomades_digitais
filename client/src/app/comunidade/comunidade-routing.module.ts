import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeCadastroComponent } from './home-cadastro/home-cadastro.component';
import { CadastroEncontroComponent } from './cadastro-encontro/cadastro-encontro.component';
import { CadastroMidiaComponent } from './cadastro-midia/cadastro-midia.component';
import { guardGuard } from '../users/guard/guard.guard';

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
    canActivate: [guardGuard],
    data: { roles: ['admin'] },
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
  exports: [RouterModule],
})
export class ComunidadeRoutingModule {}

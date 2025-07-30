import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ResetComponent } from './reset/reset.component';
import { guardGuard } from './guard/guard.guard';
import { ListaUserComponent } from './lista-user/lista-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [guardGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'user',
    component: ListaUserComponent,
    canActivate: [guardGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'resetSenha',
    component: ResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

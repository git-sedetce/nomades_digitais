import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/user/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  @ViewChild('formUser') formUser!: NgForm;
  user!: Users;

  passwordPtn = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

  constructor(
    private serviceUser: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new Users();
  }

  saveUser(): void {
    this. user.user_active = false;
    //console.log('User', this.user);
    const nome_usuario = this.user.user_email?.split("@",1).toString();
    //console.log('nome_usuario', nome_usuario);
    this.user.user_name = nome_usuario;
    this.user.profile_id = 3;
    this.user.user_pin = Math.floor(1000 + Math.random() * 9000);

    // this.user.user_password = this.serviceUser.CriptografarMD5(this.user.user_password)
    this.serviceUser.cadastrar_users(this.user).subscribe({
      next: (res: any) => {
        this.user.id = res.id
        this.toastr.success('Usuário cadastrado com sucesso!!!')
      },
      error: (e) => console.error(e)
    })
    this.router.navigate(['/login'])
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/user/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  loginUsers!: Users;

  constructor(
    private serviceUser: UserService,
    private toastr: ToastrService,
    //private router: Router
  ) {}

  ngOnInit(): void {
    this.loginUsers = new Users();
  }

  login(): void {
    // this.loginUsers.user_password = this.serviceUser.CriptografarMD5(
    //   this.loginUsers.user_password
    // );
    //console.log('loginUser', this.loginUsers)
    this.serviceUser.login(this.loginUsers).subscribe(
      () =>{
        this.toastr.success('Bem vindo ao Digital Nomads Ceará');
      },
      (error) => {
        this.toastr.error('Erro durante o login', error.error.message);
        this.formLogin.reset();
      }
    );
  }

  gerarPin(){
    this.serviceUser.resetPin(this.loginUsers).subscribe(
      () =>{
        this.toastr.success('Verifique seu Email');
        this.formLogin.reset();
      },
      (error) => {
        this.toastr.error('Erro durante o processo', error.error.message);
        this.formLogin.reset();
      }
    );

  }

}

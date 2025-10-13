import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/user/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit{
  @ViewChild("formResetPassword") formResetPassword!: NgForm;
  resetSenha!: Users;

  constructor(
    private serviceUser: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetSenha = new Users()
  }

  reset(): void {
    //console.log('resetSenha', this.resetSenha)
    // this.resetSenha.user_password = this.serviceUser.CriptografarMD5(this.resetSenha.user_password)
    this.serviceUser.reset_password(this.resetSenha).subscribe({
      next:(res:any) => {
        this.toastr.success('Senha alterada com sucesso!!!')
        this.router.navigate(['/admin/login'])
      },error: (e) => {
        console.error(e)
        this.toastr.error(e.error.message)
        this.formResetPassword.reset()
      }
    })
  }

}

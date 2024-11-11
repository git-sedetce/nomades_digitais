import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/user/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.css']
})
export class ListaUserComponent implements OnInit {

  lista_users!: any [];
  lista_profile!: any [];
  formUser!: FormGroup;
  userObj: Users = new Users();

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id: [''],
      nome_completo: [''],
      user_name: [''],
      user_email: [''],
      user_active: [false],
      profile_id: ['']
    })

    this.getUsers();
  }

  getUsers() {
    this.user.pegar_users('allUser').subscribe((usr: any[]) => {
      this.lista_users = usr;
      console.log('lista_users', this.lista_users)
    }, (erro: any) => console.error(erro))
  }

  onEdit(user: any){
    this.userObj.id = user.id;
    this.formUser.controls['nome_completo'].setValue(user.nome_completo)
    this.formUser.controls['user_name'].setValue(user.user_name)
    this.formUser.controls['user_email'].setValue(user.user_email)
    this.formUser.controls['user_active'].setValue(user.user_active)
    this.formUser.controls['profile_id'].setValue(user.profile_id)
  }
  updateUser(){
    this.userObj.nome_completo = this.formUser.value.nome_completo;
    this.userObj.user_name = this.formUser.value.user_name;
    this.userObj.user_email = this.formUser.value.user_email;
    this.userObj.user_active = this.formUser.value.user_active;
    this.userObj.profile_id = this.formUser.value.profile_id;


    this.user.atualizarUser(this.userObj, Number(this.userObj.id)).subscribe(res=>{
      this.toastr.success('Atualiação realizada com sucesso!!!')
      this.formUser.reset();
      this.getUsers();
    })

  }
  deletaUser(user: any){
    this.user.deleteUser(user.id).subscribe(res=>{
      this.toastr.success('Exclusão realizada com sucesso!!!')
      this.getUsers();
    })

  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-editar-dados',
  templateUrl: './editar-dados.component.html',
  styleUrls: ['./editar-dados.component.css']
})
export class EditarDadosComponent implements OnInit{
  profile_id!: any;
  user_id!: any;
  user_email!:any;
  token!: any;
  parceiro!: any[];
  nomad!: any[];

  constructor(
    private servicePartner: ParceriaService,
  ) { }

  ngOnInit(): void {
    this.getPerfil();

  }

  getPerfil(){
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.user_email = payload._user_email;
    console.log('Profile ID:', this.profile_id);
    console.log('Email:', this.user_email);
    if(this.profile_id === 2){
      this.getParceiros(this.user_email)
    }
    else if(this.profile_id ===1){
      this.getNomads();
    }
  }

  getParceiros(email: any) {
    this.servicePartner.parceirosByEmail(email).subscribe(
      (partner: any) => {
        this.parceiro = partner;
        console.log('partner', this.parceiro);
      },
      (erro: any) => console.error(erro)
    );
  }

  getNomads() {}

  onViewPartner(id: any){}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Nomad } from 'src/app/models/nomad/nomad.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-editar-nomads',
  templateUrl: './editar-nomads.component.html',
  styleUrls: ['./editar-nomads.component.css']
})
export class EditarNomadsComponent implements OnInit{
  lista_nomad!: any[];
  formNomad!: FormGroup;
  nomadObj: Nomad = new Nomad();
  nomad!: any;
  profile_id!: any;
  user_email!:any;

  constructor(
    public nomadService: ServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formNomad = this.formBuilder.group({
      id: [''],
      name: [''],
      lastName: [''],
      nomad_email: [''],
      contato_nomad: [''],
      cidade: [''],
      regiao: [''],
      country: [''],
      shared_info: [''],
      nomads_news: [''],
      suggestion: [''],
      first_time_ce: [''],
      data_nascimento: [''],
      passaporte: [''],
      motivo_viagem: [''],
      know_how: [''],
      profissao: [''],
      possui_empresa: [''],
      company_name: [''],
      setor: [''],
      registro: [''],
      site: ['']
    });

    this.getPerfil();

    // this.nomadService.listar_nomads('nomadsAll').subscribe((data: Nomad[]) => {
    //   this.lista_nomad = data;
    //   console.log('lista_nomad', this.lista_nomad);
    // });

  }

  // Visualizar Dados

  getPerfil(){
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.user_email = payload._user_email;
    console.log('Profile ID:', this.profile_id);
    console.log('Email:', this.user_email);
    if(this.profile_id === 1){
      this.getNomad(this.user_email)
    }
  }

  getNomad(email: any) {
    this.nomadService.nomadEmail(email).subscribe(
      (nd: any) => {
        this.nomad = nd;
        console.log('nomad', this.nomad);
      },
      (erro: any) => console.error(erro)
    );
  }

  onViewNomad(nomad: any){}

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  formEditNomad!: FormGroup;
  formEditNomadCompany!: FormGroup;
  nomadObj: Nomad = new Nomad();
  nomad!: any;
  profile_id!: any;
  user_email!:any;
  _knowhowList!: typeKnowHow[];

  constructor(
    public nomadService: ServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formEditNomad = this.formBuilder.group({
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
      know_how: this.formBuilder.array([]),
      profissao: [''],
      possui_empresa: [''],
      company_name: [''],
      setor: [''],
      registro: [''],
      site: ['']
    });

    this.getPerfil();
    this.getKnowHow();
    this.checkboxesKnowHow();

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

  getKnowHow(){
    this._knowhowList=[
      { nome:'Indicação', isselected: false },
      { nome:'Amigos', isselected: false },
      { nome:'Internet', isselected: false },
      { nome:'Grupos de Redes Sociais', isselected: false }
    ]
  }

  checkboxesKnowHow() {
    this._knowhowList.forEach((serviceKnowHow) =>
      (this.formEditNomad.controls['know_how'] as FormArray).push(
        this.formBuilder.control(serviceKnowHow.isselected)
      )
    );
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

  onViewNomad(nomad: any){
    this.nomadObj.id = nomad.id;
    this.formEditNomad.controls['name'].setValue(nomad.name);
    this.formEditNomad.controls['lastName'].setValue(nomad.lastName);
    this.formEditNomad.controls['nomad_email'].setValue(nomad.nomad_email);
    this.formEditNomad.controls['contato_nomad'].setValue(nomad.contato_nomad);
    this.formEditNomad.controls['cidade'].setValue(nomad.cidade);
    this.formEditNomad.controls['regiao'].setValue(nomad.regiao);
    this.formEditNomad.controls['country'].setValue(nomad.country);
    this.formEditNomad.controls['shared_info'].setValue(nomad.shared_info);
    this.formEditNomad.controls['nomads_news'].setValue(nomad.nomads_news);
    this.formEditNomad.controls['suggestion'].setValue(nomad.suggestion);
    this.formEditNomad.controls['first_time_ce'].setValue(nomad.first_time_ce);
    this.formEditNomad.controls['data_nascimento'].setValue(nomad.data_nascimento);
    this.formEditNomad.controls['passaporte'].setValue(nomad.passaporte);
    this.formEditNomad.controls['motivo_viagem'].setValue(nomad.motivo_viagem);
    // this.formEditNomad.controls['know_how'].setValue(nomad.know_how);
    this.formEditNomad.controls['profissao'].setValue(nomad.profissao);
    this.formEditNomad.controls['possui_empresa'].setValue(nomad.possui_empresa);
    this.formEditNomad.controls['company_name'].setValue(nomad.ass_nomade_empresa.nome_empresa);
    this.formEditNomad.controls['setor'].setValue(nomad.ass_nomade_empresa.setor);
    this.formEditNomad.controls['registro'].setValue(nomad.ass_nomade_empresa.cnpj);
    this.formEditNomad.controls['site'].setValue(nomad.ass_nomade_empresa.site);

    // checkboxes KnowHow
    const knowServiceArray = this.formEditNomad.get('know_how') as FormArray;
    // Reset all checkboxes
    knowServiceArray.controls.forEach((controlKnowHow) => controlKnowHow.setValue(false));
    // Ensure know_service is treated as an array
    let knowServices: string[] = [];
    if (typeof nomad.know_how === 'string') {
      knowServices = nomad.know_how.split(',');
    } else if (Array.isArray(nomad.know_how)) {
      knowServices = nomad.know_how;
    }

    knowServices.forEach((serviceKnowHow: string) => {
      const index = this._knowhowList.findIndex(
        (item) => item.nome === serviceKnowHow.trim()
      );
      if (index >= 0) {
        knowServiceArray.at(index).setValue(true);
      }
    });
  }

  get knowHowServiceControls(): FormControl[] {
    return (this.formEditNomad.get('know_how') as FormArray)
      .controls as FormControl[];
  }

  updateNomad(){
    this.nomadObj.name = this.formEditNomad.value.name;
    this.nomadObj.lastName = this.formEditNomad.value.lastName;
    this.nomadObj.nomad_email = this.formEditNomad.value.nomad_email;
    this.nomadObj.contato_nomad = this.formEditNomad.value.contato_nomad;
    this.nomadObj.cidade = this.formEditNomad.value.cidade;
    this.nomadObj.regiao = this.formEditNomad.value.regiao;
    this.nomadObj.country = this.formEditNomad.value.country;
    this.nomadObj.shared_info = this.formEditNomad.value.shared_info;
    this.nomadObj.nomads_news = this.formEditNomad.value.nomads_news;
    this.nomadObj.suggestion = this.formEditNomad.value.suggestion;
    this.nomadObj.first_time_ce = this.formEditNomad.value.first_time_ce;
    this.nomadObj.data_nascimento = this.formEditNomad.value.data_nascimento;
    this.nomadObj.passaporte = this.formEditNomad.value.passaporte;
    this.nomadObj.motivo_viagem = this.formEditNomad.value.motivo_viagem;
    this.nomadObj.profissao = this.formEditNomad.value.profissao;
    this.nomadObj.possui_empresa = this.formEditNomad.value.possui_empresa;
    this.nomadObj.company_name = this.formEditNomad.value.company_name;
    this.nomadObj.setor = this.formEditNomad.value.setor;
    this.nomadObj.registro = this.formEditNomad.value.registro;
    this.nomadObj.site = this.formEditNomad.value.site;

    const meetServiceArray = this.formEditNomad.get(
      'know_how'
    ) as FormArray;
    this.nomadObj.know_how = this._knowhowList
      .filter((_, index) => meetServiceArray.at(index).value)
      .map((x) => x.nome)
      .join(',')
      .toString();

    this.nomadService.updateNomad(this.nomadObj, Number(this.nomadObj.id))
      .subscribe((res) => {
        this.formEditNomad.reset();
        // this.getParceiros();
        window.location.reload();
        this.toastr.success('Empresa do Nomad atualizado com sucesso!');
      });
  }

  updateCompany(){
    this.nomadObj.company_name = this.formEditNomad.value.company_name;
    this.nomadObj.setor = this.formEditNomad.value.setor;
    this.nomadObj.registro = this.formEditNomad.value.registro;
    this.nomadObj.site = this.formEditNomad.value.site;


    this.nomadService.updateCompany(this.nomadObj, Number(this.nomadObj.id))
      .subscribe((res) => {
        this.formEditNomad.reset();
        // this.getParceiros();
        window.location.reload();
        this.toastr.success('Nomad atualizado com sucesso!');
      });
  }

  companyRegister(id: any){

  }



}

class typeKnowHow{
  nome: string | undefined;
  isselected: boolean | undefined;
}

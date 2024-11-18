import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ImgsParceiro } from 'src/app/models/parceria/imgs-parceiro.model';
import { Parceiro } from 'src/app/models/parceria/parceiro.model';
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
  parceiro!: any;
  nomad!: any[];
  isLoading!: any[]

  formEditPartner!: FormGroup;
  formEditImgPartner!: FormGroup;
  partnerObj: Parceiro = new Parceiro();
  imgPartner: ImgsParceiro = new ImgsParceiro();
  @ViewChild('imagePartner') imagePartner!: ElementRef;
  @ViewChild('arquivoPartner') arquivoPartner!: ElementRef;
  @ViewChild('alvaraInput') alvaraInput!: ElementRef;
  @ViewChild('logoInput') logoInput!: ElementRef;
  @ViewChild('comprovanteInput') comprovanteInput!: ElementRef;

  _serviceList!: typeService[];
  _meetList!: typeMeet[];
  _languageList!: typeLanguage[];

  type_service!: any;
  maxChars = 500;
  have_idioma!: any;

  constructor(
    private servicePartner: ParceriaService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.formEditPartner = this.formBuilder.group({
      cnpj: [],
      nome_fantasia: [],
      razao_social: [],
      telefone: [],
      cep: [],
      logradouro: [],
      numero: [],
      complemento: [],
      bairro: [],
      cidade: [],
      estado: [],
      email_parceiro: [],
      midia_social: [],
      instagram_parceiro: [],
      tipo_service: [],
      tipo_estabelecimento: [],
      tipo_estabelecimento_outros: [],
      essential_service: this.formBuilder.array([]),
      internet_speed: [],
      internet_service: [],
      outro_servico: [],
      trabalho_reunioes: this.formBuilder.array([]),
      tarifa_especial: [],
      internet_service_alimentacao: [],
      orienta_equipe: [],
      localizacao: [],
      ramo: [],
      beneficios: [],
      espacos_culturais: [],
      idioma: [],
      qual_idioma: this.formBuilder.array([]),
    });

    this.getPerfil();
    this.getService();
    this.addCheckboxes();
    this.getMeet();
    this.checkboxesMeet();
    this.getLanguage();
    this.checkboxesLanguage();

  }

  // Visualizar Dados

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
    // else if(this.profile_id ===1){
    //   this.getNomads();
    // }
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

  // Editar Dados

  getService() {
    this._serviceList = [
      { nome: 'Lavanderia', isselected: false },
      { nome: 'Cozinha coletiva', isselected: false },
      { nome: 'Limpeza', isselected: false },
      { nome: 'Restaurante e/ou Bar', isselected: false },
      { nome: 'Café da manhã', isselected: false },
      { nome: 'Espaços de lazer individual (ex. tv no quarto)', isselected: false },
      { nome: 'Espaços de lazer coletivo (sala de TV, de jogos, e/ou de leitura, etc)', isselected: false },
      { nome: 'Outro', isselected: false },
    ];
  }

  addCheckboxes() {
    this._serviceList.forEach((service) =>
      (this.formEditPartner.controls['essential_service'] as FormArray).push(
        this.formBuilder.control(service.isselected)
      )
    );
  }

  getMeet() {
    this._meetList = [
      { nome: 'Sim. Espaço individual para trabalho', isselected: false },
      { nome: 'Sim. Espaço coletivo para trabalho', isselected: false },
      { nome: 'Sim. Espaço para reuniões coletivas', isselected: false },
      { nome: 'Não', isselected: false },
    ];
  }

  checkboxesMeet() {
    this._meetList.forEach((serviceMeet) =>
      (this.formEditPartner.controls['trabalho_reunioes'] as FormArray).push(
        this.formBuilder.control(serviceMeet.isselected)
      )
    );
  }

  getLanguage() {
    this._languageList = [
      { nome: 'Alemão', isselected: false },
      { nome: 'Chinês', isselected: false },
      { nome: 'Espanhol', isselected: false },
      { nome: 'Francês', isselected: false },
      { nome: 'Inglês', isselected: false },
      { nome: 'Italiano', isselected: false },
      { nome: 'Japonês', isselected: false },
    ];
  }

  checkboxesLanguage() {
    this._languageList.forEach((serviceLanguage) =>
      (this.formEditPartner.controls['qual_idioma'] as FormArray).push(
        this.formBuilder.control(serviceLanguage.isselected)
      )
    );
  }

  onViewPartner(parceiro: any) {
    this.partnerObj.id = parceiro.id;
    this.formEditPartner.controls['cnpj'].setValue(parceiro.cnpj);
    this.formEditPartner.controls['nome_fantasia'].setValue(parceiro.nome_fantasia);
    this.formEditPartner.controls['razao_social'].setValue(parceiro.razao_social);
    this.formEditPartner.controls['telefone'].setValue(parceiro.telefone);
    this.formEditPartner.controls['cep'].setValue(parceiro.cep);
    this.formEditPartner.controls['logradouro'].setValue(parceiro.logradouro);
    this.formEditPartner.controls['numero'].setValue(parceiro.numero);
    this.formEditPartner.controls['complemento'].setValue(parceiro.complemento);
    this.formEditPartner.controls['bairro'].setValue(parceiro.bairro);
    this.formEditPartner.controls['cidade'].setValue(parceiro.cidade);
    this.formEditPartner.controls['estado'].setValue(parceiro.estado);
    this.formEditPartner.controls['email_parceiro'].setValue(parceiro.email_parceiro);
    this.formEditPartner.controls['midia_social'].setValue(parceiro.midia_social);
    this.formEditPartner.controls['instagram_parceiro'].setValue(parceiro.instagram_parceiro);
    this.formEditPartner.controls['tipo_service'].setValue(parceiro.tipo_service);
    this.formEditPartner.controls['tipo_estabelecimento'].setValue(parceiro.tipo_estabelecimento);
    this.formEditPartner.controls['tipo_estabelecimento_outros'].setValue(parceiro.tipo_estabelecimento_outros);
    this.formEditPartner.controls['internet_speed'].setValue(parceiro.internet_speed);
    this.formEditPartner.controls['internet_service'].setValue(parceiro.internet_service);
    this.formEditPartner.controls['outro_servico'].setValue(parceiro.outro_servico);
    this.formEditPartner.controls['tarifa_especial'].setValue(parceiro.tarifa_especial);
    this.formEditPartner.controls['internet_service_alimentacao'].setValue(parceiro.internet_service_alimentacao);
    this.formEditPartner.controls['orienta_equipe'].setValue(parceiro.orienta_equipe);
    this.formEditPartner.controls['localizacao'].setValue(parceiro.localizacao);
    this.formEditPartner.controls['ramo'].setValue(parceiro.ramo);
    this.formEditPartner.controls['beneficios'].setValue(parceiro.beneficios);
    this.formEditPartner.controls['espacos_culturais'].setValue(parceiro.espacos_culturais);
    this.formEditPartner.controls['idioma'].setValue(parceiro.idioma);

    // checkboxes essential services
    const essentialServiceArray = this.formEditPartner.get('essential_service') as FormArray;
    // Reset all checkboxes
    essentialServiceArray.controls.forEach((control) =>
      control.setValue(false)
    );
    // Ensure essential_service is treated as an array
    let essentialServices: string[] = [];
    if (typeof parceiro.essential_service === 'string') {
      essentialServices = parceiro.essential_service.split(',');
    } else if (Array.isArray(parceiro.essential_service)) {
      essentialServices = parceiro.essential_service;
    }

    essentialServices.forEach((service: string) => {
      const index = this._serviceList.findIndex(
        (item) => item.nome === service.trim()
      );
      if (index >= 0) {
        essentialServiceArray.at(index).setValue(true);
      }
    });

    // checkboxes reuniões
    const meetServiceArray = this.formEditPartner.get('trabalho_reunioes') as FormArray;
    // Reset all checkboxes
    meetServiceArray.controls.forEach((controlMeet) => controlMeet.setValue(false));
    // Ensuremeet_service is treated as an array
    let meetServices: string[] = [];
    if (typeof parceiro.trabalho_reunioes === 'string') {
      meetServices = parceiro.trabalho_reunioes.split(',');
    } else if (Array.isArray(parceiro.trabalho_reunioes)) {
      meetServices = parceiro.trabalho_reunioes;
    }

    meetServices.forEach((serviceMeet: string) => {
      const index = this._meetList.findIndex(
        (item) => item.nome === serviceMeet.trim()
      );
      if (index >= 0) {
        meetServiceArray.at(index).setValue(true);
      }
    });

    // checkboxes idioma
    const languageServiceArray = this.formEditPartner.get('qual_idioma') as FormArray;
    // Reset all checkboxes
    languageServiceArray.controls.forEach((controlLanguage) => controlLanguage.setValue(false));
    // Ensure qual_idioma is treated as an array
    let languageServices: string[] = [];
    if (typeof parceiro.qual_idioma === 'string') {
      languageServices = parceiro.qual_idioma.split(',');
    } else if (Array.isArray(parceiro.qual_idioma)) {
      languageServices = parceiro.qual_idioma;
    }

    languageServices.forEach((serviceLanguage: string) => {
      const index = this._languageList.findIndex(
        (item) => item.nome === serviceLanguage.trim()
      );
      if (index >= 0) {
        languageServiceArray.at(index).setValue(true);
      }
    });
  }

  get essentialServiceControls(): FormControl[] {
    return (this.formEditPartner.get('essential_service') as FormArray)
      .controls as FormControl[];
  }

  get meetServiceControls(): FormControl[] {
    return (this.formEditPartner.get('trabalho_reunioes') as FormArray)
      .controls as FormControl[];
  }

  get languageServiceControls(): FormControl[] {
    return (this.formEditPartner.get('qual_idioma') as FormArray)
      .controls as FormControl[];
  }

  updatePartner() {
    this.partnerObj.cnpj = this.formEditPartner.value.cnpj;
    this.partnerObj.nome_fantasia = this.formEditPartner.value.nome_fantasia;
    this.partnerObj.razao_social = this.formEditPartner.value.razao_social;
    this.partnerObj.telefone = this.formEditPartner.value.telefone;
    this.partnerObj.cep = this.formEditPartner.value.cep;
    this.partnerObj.logradouro = this.formEditPartner.value.logradouro;
    this.partnerObj.numero = this.formEditPartner.value.numero;
    this.partnerObj.complemento = this.formEditPartner.value.complemento;
    this.partnerObj.bairro = this.formEditPartner.value.bairro;
    this.partnerObj.cidade = this.formEditPartner.value.cidade;
    this.partnerObj.estado = this.formEditPartner.value.estado;
    this.partnerObj.email_parceiro = this.formEditPartner.value.email_parceiro;
    this.partnerObj.midia_social = this.formEditPartner.value.midia_social;
    this.partnerObj.instagram_parceiro =
      this.formEditPartner.value.instagram_parceiro;
    this.partnerObj.tipo_service = this.formEditPartner.value.tipo_service;
    this.partnerObj.tipo_estabelecimento =
      this.formEditPartner.value.tipo_estabelecimento;
    this.partnerObj.tipo_estabelecimento_outros =
      this.formEditPartner.value.tipo_estabelecimento_outros;
    // this.partnerObj.essential_service = this.formEditPartner.value.essential_service;
    this.partnerObj.internet_speed = this.formEditPartner.value.internet_speed;
    this.partnerObj.internet_service =
      this.formEditPartner.value.internet_service;
    this.partnerObj.outro_servico = this.formEditPartner.value.outro_servico;
    // this.partnerObj.trabalho_reunioes = this.formEditPartner.value.trabalho_reunioes;
    this.partnerObj.tarifa_especial =
      this.formEditPartner.value.tarifa_especial;
    this.partnerObj.internet_service_alimentacao =
      this.formEditPartner.value.internet_service_alimentacao;
    this.partnerObj.orienta_equipe = this.formEditPartner.value.orienta_equipe;
    this.partnerObj.localizacao = this.formEditPartner.value.localizacao;
    this.partnerObj.ramo = this.formEditPartner.value.ramo;
    this.partnerObj.beneficios = this.formEditPartner.value.beneficios;
    this.partnerObj.espacos_culturais =
      this.formEditPartner.value.espacos_culturais;
    this.partnerObj.idioma = this.formEditPartner.value.idioma;
    // this.partnerObj.qual_idioma = this.formEditPartner.value.qual_idioma;

    const essentialServiceArray = this.formEditPartner.get(
      'essential_service'
    ) as FormArray;
    this.partnerObj.essential_service = this._serviceList
      .filter((_, index) => essentialServiceArray.at(index).value)
      .map((x) => x.nome)
      .join(',')
      .toString();

    const meetServiceArray = this.formEditPartner.get(
      'trabalho_reunioes'
    ) as FormArray;
    this.partnerObj.trabalho_reunioes = this._meetList
      .filter((_, index) => meetServiceArray.at(index).value)
      .map((x) => x.nome)
      .join(',')
      .toString();

    const languageServiceArray = this.formEditPartner.get(
      'qual_idioma'
    ) as FormArray;
    this.partnerObj.qual_idioma = this._languageList
      .filter((_, index) => languageServiceArray.at(index).value)
      .map((x) => x.nome)
      .join(',')
      .toString();

    this.servicePartner
      .atualizarParceiro(this.partnerObj, Number(this.partnerObj.id))
      .subscribe((res) => {
        this.formEditPartner.reset();
        // this.getParceiros();
        window.location.reload();
        this.toastr.success('Parceiro atualizado com sucesso!');
      });
  }

}

class typeService {
  nome: string | undefined;
  isselected: boolean | undefined;
}

class typeMeet {
  nome: string | undefined;
  isselected: boolean | undefined;
}

class typeLanguage {
  nome: string | undefined;
  isselected: boolean | undefined;
}

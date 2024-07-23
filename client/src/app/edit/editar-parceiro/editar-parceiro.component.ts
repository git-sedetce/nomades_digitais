import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MapGeocoder } from '@angular/google-maps';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Parceiro } from 'src/app/models/parceria/parceiro.model';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-editar-parceiro',
  templateUrl: './editar-parceiro.component.html',
  styleUrls: ['./editar-parceiro.component.css'],
})
export class EditarParceiroComponent implements OnInit {
  formEditPartner!: FormGroup;
  partnerObj: Parceiro = new Parceiro();
  @ViewChild('imagePartner') imagePartner!: ElementRef;

  lista_parcerias!: any[];
  parceiro!: any;
  lista_imagens!: any[];
  nome_empresa!: any;
  arquivoUrl: SafeResourceUrl | null = null;
  imgUrl: SafeResourceUrl | null = null;
  isLoading = false;
  type_service!: any;
  maxChars = 500;
  _serviceList!: typeService[];
  _meetList!: typeMeet[];
  _languageList!: typeLanguage[];
  have_idioma!: any;
  tipo_estabelecimento_outros!: any;

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

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

    this.getParceiros();
    this.getService();
    this.addCheckboxes();
    this.getMeet();
    this.checkboxesMeet();
    this.getLanguage();
    this.checkboxesLanguage();
  }

  getParceiros() {
    this.service.listarParceiros('listaParceiros').subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        // console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  getService() {
    this._serviceList = [
      { nome: 'Lavanderia', isselected: false },
      { nome: 'Cozinha coletiva', isselected: false },
      { nome: 'Limpeza', isselected: false },
      { nome: 'Restaurante e/ou Bar', isselected: false },
      { nome: 'Café da manhã', isselected: false },
      {
        nome: 'Espaços de lazer individual (ex. tv no quarto)',
        isselected: false,
      },
      {
        nome: 'Espaços de lazer coletivo (sala de TV, de jogos, e/ou de leitura, etc)',
        isselected: false,
      },
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

  getEmpresa() {
    this.getParceiros();
  }

  filtroCompany(id: any) {
    this.getLogo(id);
    this.getImagens(id);
    this.service.parceirosById(id).subscribe(
      (partnerId: any) => {
        this.parceiro = partnerId;
        // console.log('parceiro', this.parceiro);
      },
      (erro: any) => console.log(erro)
    );
  }

  onEdit(parceiro: any) {
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
    // this.formEditPartner.controls['essential_service'].setValue(parceiro.essential_service);
    this.formEditPartner.controls['internet_speed'].setValue(parceiro.internet_speed);
    this.formEditPartner.controls['internet_service'].setValue(parceiro.internet_service);
    this.formEditPartner.controls['outro_servico'].setValue(parceiro.outro_servico);
    // this.formEditPartner.controls['trabalho_reunioes'].setValue(parceiro.trabalho_reunioes);
    this.formEditPartner.controls['tarifa_especial'].setValue(parceiro.tarifa_especial);
    this.formEditPartner.controls['internet_service_alimentacao'].setValue(parceiro.internet_service_alimentacao);
    this.formEditPartner.controls['orienta_equipe'].setValue(parceiro.orienta_equipe);
    this.formEditPartner.controls['localizacao'].setValue(parceiro.localizacao);
    this.formEditPartner.controls['ramo'].setValue(parceiro.ramo);
    this.formEditPartner.controls['beneficios'].setValue(parceiro.beneficios);
    this.formEditPartner.controls['espacos_culturais'].setValue(parceiro.espacos_culturais);
    this.formEditPartner.controls['idioma'].setValue(parceiro.idioma);
    // this.formEditPartner.controls['qual_idioma'].setValue(parceiro.qual_idioma);

    // checkboxes essential services
    const essentialServiceArray = this.formEditPartner.get(
      'essential_service'
    ) as FormArray;
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

    // this.partnerObj.essential_service = this._serviceList
    //   .filter((x) => x.isselected == true)
    //   .map((x) => x.nome)
    //   .join(',')
    //   .toString();

    this.service
      .atualizarParceiro(this.partnerObj, Number(this.partnerObj.id))
      .subscribe((res) => {
        this.toastr.success('Parceiro Cadastrado com sucesso!');
        this.formEditPartner.reset();
        this.getParceiros();
        window.location.reload();
      });
  }

  getLogo(id: any) {
    this.service.logoById(id).subscribe(
      (logo: any) => {
        const binaryString = window.atob(logo);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Criar um Blob a partir do ArrayBuffer
        const blob = new Blob([bytes], { type: 'image/jpeg' });

        // Criar uma URL segura para a imagem Blob
        const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(blob)
        );
        this.imgUrl = imageUrl;
        console.log('imgUrl', this.imgUrl);
      },
      (error) => {
        console.error('Imagem não encontrada:', error);
      }
    );
  }

  getImagens(id: any) {
    this.service.imagensById(id).subscribe(
      (imagensData: any[]) => {
        this.lista_imagens = imagensData.map((imagem) => {
          const decodedImage = 'data:image/jpeg;base64,' + imagem.base64;
          const safeImageUrl: SafeUrl =
            this.sanitizer.bypassSecurityTrustUrl(decodedImage);
          return {
            id: imagem.id,
            tipo_anexo: imagem.tipo_anexo,
            imagem: safeImageUrl,
          };
        });

        console.log('lista_imagens', this.lista_imagens);
      },
      (erro: any) => console.error(erro)
    );
  }

  editImg(img: any) {
    console.log('Editar imagem', img);
  }

  deleteImagem(midia: any) {
    console.log('Deletar imagem', midia);
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

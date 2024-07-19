import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MapGeocoder } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Parceiro } from 'src/app/models/parceria/parceiro.model';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-editar-parceiro',
  templateUrl: './editar-parceiro.component.html',
  styleUrls: ['./editar-parceiro.component.css']
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
  have_idioma!: any;
  tipo_estabelecimento_outros!:any;


  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
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
      essential_service: [],
      internet_speed: [],
      internet_service: [],
      outro_servico: [],
      trabalho_reunioes: [],
      tarifa_especial: [],
      internet_service_alimentacao: [],
      orienta_equipe: [],
      localizacao: [],
      ramo: [],
      beneficios: [],
      espacos_culturais: [],
      idioma: [],
      qual_idioma: []
    })

    this.getParceiros();
  }

  getParceiros() {
    this.service.listarParceiros('listaParceiros').subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        console.log('partners', this.lista_parcerias);
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

  getEmpresa(){
    this.getParceiros();
  }

  filtroCompany(id: any) {
    this.getLogo(id);
    this.getImagens(id);
    this.service.parceirosById(id).subscribe(
      (partnerId: any) => {
        this.parceiro = partnerId;
        console.log('parceiro', this.parceiro)
      },
      (erro: any) => console.log(erro)
    );
  }

  onEdit(parceiro: any) {
    this.partnerObj.id = parceiro.id
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
    this.formEditPartner.controls['essential_service'].setValue(parceiro.essential_service);
    this.formEditPartner.controls['internet_speed'].setValue(parceiro.internet_speed);
    this.formEditPartner.controls['internet_service'].setValue(parceiro.internet_service);
    this.formEditPartner.controls['outro_servico'].setValue(parceiro.outro_servico);
    this.formEditPartner.controls['trabalho_reunioes'].setValue(parceiro.trabalho_reunioes);
    this.formEditPartner.controls['tarifa_especial'].setValue(parceiro.tarifa_especial);
    this.formEditPartner.controls['internet_service_alimentacao'].setValue(parceiro.internet_service_alimentacao);
    this.formEditPartner.controls['orienta_equipe'].setValue(parceiro.orienta_equipe);
    this.formEditPartner.controls['localizacao'].setValue(parceiro.localizacao);
    this.formEditPartner.controls['ramo'].setValue(parceiro.ramo);
    this.formEditPartner.controls['beneficios'].setValue(parceiro.beneficios);
    this.formEditPartner.controls['espacos_culturais'].setValue(parceiro.espacos_culturais);
    this.formEditPartner.controls['idioma'].setValue(parceiro.idioma);
    this.formEditPartner.controls['qual_idioma'].setValue(parceiro.qual_idioma);
  }

  updatePartner(){
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
    this.partnerObj.instagram_parceiro = this.formEditPartner.value.instagram_parceiro;
    this.partnerObj.tipo_service = this.formEditPartner.value.tipo_service;
    this.partnerObj.tipo_estabelecimento = this.formEditPartner.value.tipo_estabelecimento;
    this.partnerObj.tipo_estabelecimento_outros = this.formEditPartner.value.tipo_estabelecimento_outros;
    //this.partnerObj.essential_service = this.formEditPartner.value.essential_service;
    this.partnerObj.internet_speed = this.formEditPartner.value.internet_speed;
    this.partnerObj.internet_service = this.formEditPartner.value.internet_service;
    this.partnerObj.outro_servico = this.formEditPartner.value.outro_servico;
    this.partnerObj.trabalho_reunioes = this.formEditPartner.value.trabalho_reunioes;
    this.partnerObj.tarifa_especial = this.formEditPartner.value.tarifa_especial;
    this.partnerObj.internet_service_alimentacao = this.formEditPartner.value.internet_service_alimentacao;
    this.partnerObj.orienta_equipe = this.formEditPartner.value.orienta_equipe;
    this.partnerObj.localizacao = this.formEditPartner.value.localizacao;
    this.partnerObj.ramo = this.formEditPartner.value.ramo;
    this.partnerObj.beneficios = this.formEditPartner.value.beneficios;
    this.partnerObj.espacos_culturais = this.formEditPartner.value.espacos_culturais;
    this.partnerObj.idioma = this.formEditPartner.value.idioma;
    this.partnerObj.qual_idioma = this.formEditPartner.value.qual_idioma;

    this.partnerObj.essential_service = this._serviceList
      .filter((x) => x.isselected == true)
      .map((x) => x.nome)
      .join(',')
      .toString();

    this.service.atualizarParceiro(this.partnerObj, Number(this.partnerObj.id)).subscribe(res =>{
      this.toastr.success('Parceiro Cadastrado com sucesso!');
      this.formEditPartner.reset();
      this.getParceiros();
      window.location.reload();
    })
  }

  getLogo(id: any) {
    this.service.logoById(id).subscribe(
      (logo: any) => {
        const binaryString = window.atob(logo);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen)

        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }

      // Criar um Blob a partir do ArrayBuffer
      const blob = new Blob([bytes], { type: 'image/jpeg' });

       // Criar uma URL segura para a imagem Blob
      const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.imgUrl = imageUrl;
         console.log('imgUrl', this.imgUrl);
      },
      error => {
        console.error('Imagem não encontrada:', error);
    }
    );
  }

  getImagens(id: any){
    this.service.imagensById(id).subscribe((imagensData: any[]) => {
      this.lista_imagens = imagensData.map(imagem => {
        const decodedImage = 'data:image/jpeg;base64,' + imagem.base64;
        const safeImageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(decodedImage);
        return {
            id: imagem.id,
            tipo_anexo: imagem.tipo_anexo,
            imagem: safeImageUrl
        };
    });

      console.log('lista_imagens', this.lista_imagens)
    }, (erro: any) => console.error(erro))

  }

  editImg(img: any){
    console.log('Editar imagem', img)
  }

  deleteImagem(midia: any){
    console.log('Deletar imagem', midia)
  }

}

class typeService {
  nome: string | undefined;
  isselected: boolean | undefined;
}

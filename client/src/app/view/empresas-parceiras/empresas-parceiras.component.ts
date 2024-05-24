import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-empresas-parceiras',
  templateUrl: './empresas-parceiras.component.html',
  styleUrls: ['./empresas-parceiras.component.css'],
})
export class EmpresasParceirasComponent implements OnInit {
  lista_parcerias!: any[];
  lista_parcerias_modal!: any[];
  lista_bairro!: any[];
  lista_cidade!: any[];
  nome_empresa!: any;
  formParceria!: FormGroup
  arquivoUrl: SafeResourceUrl | null = null
  imgUrl: SafeResourceUrl | null = null;

  constructor(
    private service: ParceriaService
  ) {}

  ngOnInit(): void {
    // this.formParceria = this.formBuilder.group({
    //   id: [''],
    //   cnpj: [''],
    //   nome_fantasia: [''],
    //   razao_social: [''],
    //   telefone: [''],
    //   cep: [''],
    //   logradouro: [''],
    //   numero: [''],
    //   complemento: [''],
    //   bairro: [''],
    //   cidade: [''],
    //   estado:  [''],
    //   email_parceiro:  [''],
    //   midia_social:  [''],
    //   tipo_service:  [''],
    //   internet_speed: [''],
    //   internet_service: [''],
    //   outro_servico: [''],
    //   trabalho_reunioes: [''],
    //   tarifa_especial: [''],
    //   internet_service_alimentacao: [''],
    //   orienta_equipe:  [''],
    //   localizacao:  [''],
    //   ramo:  [''],
    //   beneficios:  [''],
    //   espacos_culturais: [''],
    //   idioma: [''],
    //   qual_idioma: [''],
    //   instagram_parceiro: [''],
    //   tipo_estabelecimento: [''],
    //   tipo_estabelecimento_outros: ['']
    // })

    this.getParceiros();
    this.getBairro();
    this.getCidades();
  }

  getParceiros() {
    this.service.pegarParceiros('parceiro').subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  getEmpresa(){
    this.getParceiros();
  }

  getBairro() {
    this.service.listarBairros('listaBairros').subscribe(
      (neighborhood: any[]) => {
        this.lista_bairro = neighborhood;
        // console.log('neighborhoods', this.lista_bairro);
      },
      (erro: any) => console.log(erro)
    );
  }

  getCidades() {
    this.service.listarCidades('listaCidades').subscribe(
      (city: any[]) => {
        this.lista_cidade = city;
        // console.log('citys', this.lista_cidade);
      },
      (erro: any) => console.log(erro)
    );
  }

  filtroBairro(bairro: any) {
    this.service.parceirosByMunicipio('parceiroByBairro/', bairro).subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        // console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  filtroCidade(cidade: any) {
    this.service.parceirosByMunicipio('parceiroByCidade/', cidade).subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        // console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  tipo_service!: any;
  tipo_estabelecimento!: any;
  reunioes!: any;
  espacos_culturais!: any;
  qual_idioma!: any;
  ramo!: any;
  telefone!: any;
  beneficios!: any;
  instagram!: any;
  email!: any;
  tem_internet: any;
  internet!: any;
  orienta_equipe!: any;
  espaco_trabalho!: any;
  essential_service!: any;

  onView(id: any) {
    this.service.parceirosById(id).subscribe(
      (partnerID: any) => {
        this.nome_empresa = partnerID.razao_social
        this.tipo_service = partnerID.tipo_service;
        this.espacos_culturais = partnerID.espacos_culturais;
        this.qual_idioma = partnerID.qual_idioma;
        this.ramo = partnerID.ramo;
        this.telefone = partnerID.telefone;
        this.beneficios = partnerID.beneficios;
        this.instagram = partnerID.instagram_parceiro;
        this.email = partnerID.email_parceiro;

        if(partnerID.internet_speed == 'acima_30'){
          this.internet = 'Internet muito boa, acima de 30 Mbps'
        } else if(partnerID.internet_speed == '30 Mbps'){
          this.internet = 'Internet boa de 30 Mbps'
        }else {
          this.internet = 'Vamos melhorar a nossa internet!'
        }
        this.tipo_estabelecimento = partnerID.tipo_estabelecimento;
        this.reunioes = partnerID.trabalho_reunioes;
        this.orienta_equipe = partnerID.orienta_equipe;
        this.espaco_trabalho = partnerID.internet_service_alimentacao;
        this.essential_service = partnerID.essential_service;
        this.tem_internet = partnerID.internet_service;
        console.log('partnerID', partnerID);
    },
    (erro: any) => console.log(erro))
  }
}

import { Component, OnInit } from '@angular/core';
import { ConsultaCepService }from '../service/consulta-cep.service';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {

  radio_service: any;
  speed_quality: any;
  have_internet: any;

  empresa = {
    cnpj: '',
    nome_fantasia: '',
    razao_social: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    email_parceiro: '',
    midia_social: '',
    tipo_service: '',
    essential_service: '',
    internet_speed: '',
    internet_service: '',
    outro_servico: '',
    trabalho_reunioes: '',
    tarifa_especial: '',
    internet_service_alimentacao: '',
    orienta_equipe: '',
    localizacao: '',
    ramo: '',
    beneficios: '',
    espacos_culturais: '',
  }
  submitted = false

  submitParceiro(parceiro:any){
    console.log(parceiro)
    console.log(this.empresa)
  }

  constructor(private cepsService: ConsultaCepService, public service: ServiceService) { }

  ngOnInit() {

    this.getService()
    this.getMeet()

  }

  consultaCEP(cep: any, form: any) {
    console.log(form)

    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.cepsService.buscar(cep)
      .subscribe((dados: any) => this.populaForm(dados, form));
    }
    }
    populaForm(dados:any, formulario:any){
      formulario.form.patchValue({
        endereco: {
          logradouro: dados.logradouro,
          // cep: dados.cep,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });

    }

    savePartner(): void {
      this.empresa.essential_service = this._serviceList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
      this.empresa.trabalho_reunioes = this._meetList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
      const data ={
        cnpj: this.empresa.cnpj,
        nome_fantasia: this.empresa.nome_fantasia,
        razao_social: this.empresa.razao_social,
        telefone: this.empresa.telefone,
        cep: this.empresa.cep,
        logradouro: this.empresa.logradouro,
        numero: this.empresa.numero,
        complemento: this.empresa.complemento,
        bairro: this.empresa.bairro,
        cidade: this.empresa.cidade,
        estado: this.empresa.estado,
        email_parceiro: this.empresa.email_parceiro,
        midia_social: this.empresa.midia_social,
        tipo_service: this.empresa.tipo_service,
        essential_service: this.empresa.essential_service,
        internet_speed: this.empresa.internet_speed,
        internet_service: this.empresa.internet_service,
        outro_servico: this.empresa.outro_servico,
        trabalho_reunioes: this.empresa.trabalho_reunioes,
        tarifa_especial: this.empresa.tarifa_especial,
        internet_service_alimentacao: this.empresa.internet_service_alimentacao,
        orienta_equipe: this.empresa.orienta_equipe,
        localizacao: this.empresa.localizacao,
        ramo: this.empresa.ramo,
        beneficios: this.empresa.beneficios,
        espacos_culturais: this.empresa.espacos_culturais
      }
      this.service.cadastar_parceiro(data).subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      })
    }

    novoCadastroParceiro(): void {
      this.submitted = false;
      this.empresa = {
        cnpj: '',
        nome_fantasia: '',
        razao_social: '',
        telefone: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        email_parceiro: '',
        midia_social: '',
        tipo_service: '',
        essential_service: '',
        internet_speed: '',
        internet_service: '',
        outro_servico: '',
        trabalho_reunioes: '',
        tarifa_especial: '',
        internet_service_alimentacao: '',
        orienta_equipe: '',
        localizacao: '',
        ramo: '',
        beneficios: '',
        espacos_culturais: '',
      }
    }

    _serviceList!: typeService[];
    _meetList!: typeMeet[];

    getService(){
      this._serviceList=[
        {nome: "Lavanderia", isselected: false},
        {nome: "Cozinha coletiva", isselected: false},
        {nome: "Limpeza", isselected: false},
        {nome: "Restaurante e/ou Bar", isselected: false},
        {nome: "Café da manhã", isselected: false},
        {nome: "Espaços de lazer individual (ex. tv no quarto)", isselected: false},
        {nome: "Espaços de lazer coletivo (sala de TV, de jogos, e/ou de leitura, etc)", isselected: false},
        {nome: "Outro", isselected: false}
      ]
    }

    getMeet(){
      this._meetList=[
        { nome:"Sim. Espaço individual para trabalho", isselected: false },
        { nome:"Sim. Espaço coletivo para trabalho", isselected: false },
        { nome:"Sim. Espaço para reuniões coletivas", isselected: false },
        { nome:"Não", isselected: false }
      ]
    }
    onChange(){
      console.log(this._serviceList);
      console.log(this._meetList);
    }
}
class typeService {
  nome: string | undefined;
  isselected: boolean | undefined;
}
class typeMeet{
  nome: string | undefined;
  isselected: boolean | undefined;
}

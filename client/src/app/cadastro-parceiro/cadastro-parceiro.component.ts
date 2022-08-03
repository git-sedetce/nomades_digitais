import { Component, OnInit } from '@angular/core';
import { ConsultaCepService }from '../service/consulta-cep.service';


@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {

  radio_service: any;
  speed_quality: any;

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



  submitParceiro(parceiro:any){
    console.log(parceiro)
    console.log(this.empresa)
  }

  constructor(private cepsService: ConsultaCepService) { }

  ngOnInit() {

    this.getService()

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

    _serviceList: typeService[] | undefined;

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

    onChange(){
      console.log(this._serviceList);
    }

}
class typeService {
  nome: string | undefined;
  isselected: boolean | undefined;

}

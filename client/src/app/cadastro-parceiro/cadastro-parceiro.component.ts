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


  submitParceiro(parceiro:any){
    console.log(parceiro)
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

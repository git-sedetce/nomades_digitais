import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';

@Component({
  selector: 'app-cadastro-municipio',
  templateUrl: './cadastro-municipio.component.html',
  styleUrls: ['./cadastro-municipio.component.css']
})
export class CadastroMunicipioComponent implements OnInit {

  service_wifi: any;
  rota_turistica: any;
  municipio!: any[];
  city:any;
  lista_municipio!: any[];
  cadastro_cidade = {
    cidade: '',
    regiao: '',
    email_prefeitura: '',
    contato_prefeitura: '',
    link_prefeitura: '',
    historia_cidade: '',
    wifi_service: '',
    wifi_cidade: '',
    service_estrangeiro: '',
    service_cidade: '',
    service_empresario: '',
    service_seguranca: '',
    pontos_turisticos: '',
    espacos_culturais: '',
    espacos_lazer: '',
    tipo_turismo: '',
    rota: '',
    qual_rota: '',
  }

  submitCity(municipio:any){
    console.log(municipio)
    console.log(this.cadastro_cidade)
  }


  constructor( public services: ListaMinucipioService) { }

  ngOnInit(): void {

       /* this.services.listar_municipio('municipio')
        .subscribe((m: any) => {
          this.municipio = m );
        console.log('municipio', m);*/


    this.services.listar_municipio('municipio')
      .subscribe((m: any[]) => {
        console.log('lista_municipio', m);
        this.lista_municipio = m;
      }, (erro: any) => console.log(erro)
      );
  }
  localizaregiao(cidade: any, form: any){
    this.services.listar_municipio('municipio')
      .subscribe((m: any[]) => {
        console.log('m', m[0].id)
        if (cidade != null && cidade !== '') {
          this.services.pegar_regiao("regiao",id)
          .subscribe((dados: any) => this.achaRegiao());
        }
       // console.log('lista_municipio', m);
       // this.lista_municipio = m;
      },
      );

    }
    achaRegiao(){
      console.log('lista_municipio');

    }


  }




function id(_arg0: string, _id: any) {
  throw new Error('Function not implemented.');
}


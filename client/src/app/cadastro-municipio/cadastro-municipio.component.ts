import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { ServiceService } from '../services/service.service';

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
  submitted = false;

  submitCity(municipio:any){
    console.log(municipio)
    console.log(this.cadastro_cidade)
  }


  constructor( public services: ListaMinucipioService, public service: ServiceService) { }

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

    //cadastrar a cidade

    saveCity(): void{
      const data = {
        cidade: this.cadastro_cidade.cidade,
        regiao: this.cadastro_cidade.regiao,
        email_prefeitura: this.cadastro_cidade.email_prefeitura,
        contato_prefeitura: this.cadastro_cidade.contato_prefeitura,
        link_prefeitura: this.cadastro_cidade.link_prefeitura,
        historia_cidade: this.cadastro_cidade.historia_cidade,
        wifi_service: this.cadastro_cidade.wifi_service,
        wifi_cidade: this.cadastro_cidade.wifi_cidade,
        service_estrangeiro: this.cadastro_cidade.service_estrangeiro,
        service_cidade: this.cadastro_cidade.service_cidade,
        service_empresario: this.cadastro_cidade.service_empresario,
        service_seguranca: this.cadastro_cidade.service_seguranca,
        pontos_turisticos: this.cadastro_cidade.pontos_turisticos,
        espacos_culturais: this.cadastro_cidade.espacos_culturais,
        espacos_lazer: this.cadastro_cidade.espacos_lazer,
        tipo_turismo: this.cadastro_cidade.tipo_turismo,
        rota: this.cadastro_cidade.rota,
        qual_rota: this.cadastro_cidade.qual_rota
      };
      this.service.cadastar_municipio(data)
      .subscribe({
          next: (res: any) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e: any) => console.error(e)
        })
    }

    novoCadastro(): void {
      this.submitted = false;
      this.cadastro_cidade = {
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
      };
    }




  }




function id(_arg0: string, _id: any) {
  throw new Error('Function not implemented.');
}


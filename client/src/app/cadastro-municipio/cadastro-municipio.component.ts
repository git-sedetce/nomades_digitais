import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { HttpClient } from '@angular/common/http'
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-cadastro-municipio',
  templateUrl: './cadastro-municipio.component.html',
  styleUrls: ['./cadastro-municipio.component.css']
})
export class CadastroMunicipioComponent implements OnInit {

  @ViewChild('filesInput') filesInput!: ElementRef;

  service_wifi: any;
  rota_turistica: any;
  municipio!: any[];
  city:any;
  lista_municipio!: any[];
  multipleImages = [];
  cadastro_cidade = {
    id: '',
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

  maxChars = 500

  submitCity(municipio:any){
    console.log(municipio)
    console.log(this.cadastro_cidade)
  }


  constructor( public services: ListaMinucipioService, public service: ServiceService, private http: HttpClient) { }

  ngOnInit(): void {

    this.getTourism()

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
      this.cadastro_cidade.tipo_turismo = this._tourismList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
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
            this.cadastro_cidade = res.id
            this.submitted = true;
          },
          error: (e: any) => console.error(e)
        })
    }

    novoCadastro(): void {
      this.submitted = false;
      this.getTourism();
      this.cadastro_cidade = {
        cidade: '',
        id:'',
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

    _tourismList!: typeTourism[];

    getTourism(){
      this._tourismList=[
        { nome:"Praia", isselected: false },
        { nome:"Religião", isselected: false },
        { nome:"Serra", isselected: false },
        { nome:"Sertão", isselected: false }
      ]
    }

    //anexos

    selectMultipleImage(event: any) {
      if (event.target.files.length > 0) {
        this.multipleImages = event.target.files;
      }
    }

    onFilesUpload(){
      const files = new FormData()

      for(let img of this.multipleImages){
        files.append('files', img)
      }

      /*
      for (let index = 0; index < this.multipleImages.length; index++){
        const element = this.multipleImages[index]
        files.append('file', element)
      }

      file.append("id", this.cadastro_cidade.id + '');
      console.log('formData', file)
      console.log('id', this.cadastro_cidade.id)*/

      this.http.post(environment.url + 'anexosMunicipio', files).subscribe((response: any) => {
        console.log(response)
      })
    }




  }

  class typeTourism{
    nome: string | undefined;
    isselected: boolean | undefined;
  }




function id(_arg0: string, _id: any) {
  throw new Error('Function not implemented.');
}


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListaMinucipioService } from 'src/app/service/listarmunicipio/lista-minucipio.service';
import { ServiceService } from 'src/app/services/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-municipio',
  templateUrl: './cadastro-municipio.component.html',
  styleUrls: ['./cadastro-municipio.component.css'],
})
export class CadastroMunicipioComponent implements OnInit {
  @ViewChild('filesInput') filesInput!: ElementRef;

  service_wifi: any;
  rota_turistica: any;
  municipio!: any[];
  city: any;
  resposta_anexo: any;
  id_regiao: any;
  lista_municipio!: any[];
  multipleImages = [];
  municipio_id!: any;
  regiao_id!: any;
  cadastro_cidade = {
    id: '',
    cidade: '',
    regiao: '',
    cod_ibge: '',
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
    tourism_ecologico: '',
    tourism_praiano: '',
    tourism_radical: '',
    tourism_religioso: '',
    tourism_serrano: '',
    tourism_sertanejo: '',
    rota: '',
    qual_rota: '',
  };
  submitted = false;

  maxChars = 500;
  qtdeChars = 255;
  maxChars_link = 150;

  submitCity(municipio: any) {
    console.log(municipio);
    console.log(this.cadastro_cidade);
  }

  constructor(
    public services: ListaMinucipioService,
    public service: ServiceService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTourism();

    this.services.listar_municipio('todos_municipio').subscribe(
      (m: any[]) => {
        //console.log('lista_municipio', m);
        this.lista_municipio = m;
      },
      (erro: any) => console.log(erro),
    );
  }

  achaRegiao() {
    console.log('lista_municipio');
  }

  //cadastrar a cidade

  saveCity(): void {
    this.cadastro_cidade.tipo_turismo = this._tourismList
      .filter((x) => x.isselected == true)
      .map((x) => x.nome)
      .join(',');

    const data = {
      cidade: this.municipio_id,

      regiao: this.regiao_id,

      cod_ibge: this.cadastro_cidade.cod_ibge,

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

      qual_rota: this.cadastro_cidade.qual_rota,

      tourism_ecologico: this.cadastro_cidade.tourism_ecologico,

      tourism_praiano: this.cadastro_cidade.tourism_praiano,

      tourism_radical: this.cadastro_cidade.tourism_radical,

      tourism_religioso: this.cadastro_cidade.tourism_religioso,

      tourism_serrano: this.cadastro_cidade.tourism_serrano,

      tourism_sertanejo: this.cadastro_cidade.tourism_sertanejo,
    };

    const formData = new FormData();

    formData.append('dados', JSON.stringify(data));

    for (let img of this.multipleImages) {
      formData.append('files', img);
    }

    this.http.post(environment.url + 'parceiroMunicipio', formData).subscribe({
      next: (res: any) => {
        console.log(res);

        this.cadastro_cidade.id = res.municipio.id;

        this.toastr.success('Cadastro realizado com sucesso!');
        this.router.navigate(['/municipio/tipo_turismo']);
      },

      error: (e: any) => {
        console.error(e);
      },
    });
  }

  //retorna região

  localizaregiao(cidade: any, form: any) {
    console.log('cidade', cidade);
    this.services
      .pegar_municipio('municipio/', cidade)
      .subscribe((regiao: any) => {
        console.log('regiao', regiao);
        this.municipio_id = regiao.id;
        this.regiao_id = regiao.regiao_id;
        this.cadastro_cidade.cod_ibge = regiao.cod_ibge;
        this.pegarnomeRegiao(regiao.regiao_id);
      });
  }

  pegarnomeRegiao(id: any) {
    //id = this.id_regiao
    this.services.pegar_regiao('regiao/', id).subscribe(
      (id_r: any) => {
        //console.log(id_r)
        this.cadastro_cidade.regiao = id_r.nome;
      },
      (erro: any) => console.log(erro),
    );
  }

  novoCadastro() {
    window.location.reload();
  }

  _tourismList!: typeTourism[];

  getTourism() {
    this._tourismList = [
      { nome: 'Ecológico', isselected: false },
      { nome: 'Praiano', isselected: false },
      { nome: 'Radical', isselected: false },
      { nome: 'Religioso', isselected: false },
      { nome: 'Serrano', isselected: false },
      { nome: 'Sertanejo', isselected: false },
    ];
  }

  //anexos

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = Array.from(event.target.files);
    }
  }
}

class typeTourism {
  nome: string | undefined;
  isselected: boolean | undefined;
}

function id(_arg0: string, _id: any) {
  throw new Error('Function not implemented.');
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css'],
})
export class CadastroParceiroComponent implements OnInit {
  radio_service: any;
  speed_quality: any;
  have_internet: any;
  have_idioma: any;
  tipo_estabelecimento_outros: any;
  maxChars = 500;
  qtdeChars = 255;
  maxChars_link = 150;

  loading = false;

  comprovanteFile!: File;
  alvaraFile!: File;
  logoFile!: File;
  imagensFiles: File[] = [];

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
    instagram_parceiro: '',
    tipo_service: '',
    tipo_estabelecimento: '',
    tipo_estabelecimento_outros: '',
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
    idioma: '',
    qual_idioma: '',
  };
  documentos = {
    user_id: '',
    caminho: '',
  };

  submitParceiro(parceiro: any) {
    console.log(parceiro);
    //console.log(this.empresa)
  }

  constructor(
    private cepsService: ConsultaCepService,
    public service: ServiceService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getService();
    this.getMeet();
    this.getLanguage();
  }

  //preencher o endereço usando o cep

  consultaCEP(cep: any, form: any) {
    // console.log(form)

    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.cepsService
        .buscar(cep)
        .subscribe((dados: any) => this.populaForm(dados, form));
    }
  }
  populaForm(dados: any, formulario: any) {
    formulario.form.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  //fim do metodo cep

  //consulta cnpj

  buscarCNPJ(cnpj: any, form: any) {
    this.service.pegar_cnpj(cnpj).subscribe((res: any) => {
      //console.log('res', res)
      if (res.mensagem === 'CNPJ já cadastrado!') {
        this.toastr.error(res.mensagem);
        this.empresa.cnpj = '';
      } else {
        this.toastr.success(`CNPJ disponível para cadastro`);
      }
    });
  }

  //salvar parceiro

  savePartner(): void {
    this.loading = true;

    this.empresa.essential_service = this._serviceList
      .filter((x) => x.isselected)
      .map((x) => x.nome)
      .join(',');

    this.empresa.trabalho_reunioes = this._meetList
      .filter((x) => x.isselected)
      .map((x) => x.nome)
      .join(',');

    this.empresa.qual_idioma = this._languageList
      .filter((x) => x.isselected)
      .map((x) => x.nome)
      .join(',');

    const formData = new FormData();

    // dados do formulário
    formData.append('dados', JSON.stringify(this.empresa));

    // comprovante
    if (this.comprovanteFile) {
      formData.append('comprovante', this.comprovanteFile);
    }

    // alvará
    if (this.alvaraFile) {
      formData.append('alvara', this.alvaraFile);
    }

    // logo
    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }

    // imagens
    if (this.imagensFiles.length > 0) {
      for (let file of this.imagensFiles) {
        const ext = file.name.split('.').pop()?.toLowerCase();

        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
          this.toastr.error('Somente imagens JPG/JPEG/PNG');

          this.loading = false;
          return;
        }

        formData.append('imagens', file);
      }
    }

    this.service.cadastrar_parceiro(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Cadastro realizado com sucesso!');

        this.loading = false;

        this.router.navigate(['/home']);
      },

      error: (err) => {
        this.loading = false;

        this.toastr.error(err?.error?.message || 'Erro ao cadastrar parceiro');
      },
    });
  }

  onComprovanteSelected(event: any): void {
    this.comprovanteFile = event.target.files[0];
  }

  onAlvaraSelected(event: any): void {
    this.alvaraFile = event.target.files[0];
  }

  onLogoSelected(event: any): void {
    this.logoFile = event.target.files[0];
  }

  onImagesSelected(event: any): void {
    this.imagensFiles = Array.from(event.target.files);
  }

  _serviceList!: typeService[];
  _meetList!: typeMeet[];
  _languageList!: typeLanguage[];

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

  getMeet() {
    this._meetList = [
      { nome: 'Sim. Espaço individual para trabalho', isselected: false },
      { nome: 'Sim. Espaço coletivo para trabalho', isselected: false },
      { nome: 'Sim. Espaço para reuniões coletivas', isselected: false },
      { nome: 'Não', isselected: false },
    ];
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

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConsultaCepService }from '../service/consulta-cep.service';
import { ServiceService } from '../services/service.service';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('alvaraInput') alvaraInput!: ElementRef;
  @ViewChild('logoInput') logoInput!: ElementRef;

  radio_service: any;
  speed_quality: any;
  have_internet: any;
  have_idioma: any;
  tipo_estabelecimento_outros: any;
  resposta_anexo: any;
  habilita_anexo!: boolean;
  alvara_anexo: any;
  habilita_anexo_alvara!: boolean;
  logo_anexo: any;
  habilita_anexo_logo!: boolean;
  habilita_anexo_imgs!: boolean;
  multipleFiles = [];

  empresa = {
    id: '',
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
    tipo_estabelecimento_outros:'',
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
    qual_idioma:'',
  }
  documentos = {
    user_id: '',
    caminho: ''
  }
  submitted = false
  maxChars = 500
  qtdeChars = 255
  maxChars_link = 150

  submitParceiro(parceiro:any){
    console.log(parceiro)
    //console.log(this.empresa)
  }

  constructor(private cepsService: ConsultaCepService, public service: ServiceService, private http: HttpClient) { }

  ngOnInit() {

    this.getService()
    this.getMeet()
    this.getLanguage()

  }

  //preencher o endereço usando o cep

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

    //fim do metodo cep

    //consulta cnpj

    buscarCNPJ(cnpj:any){
      this.service.pegar_cnpj(cnpj)
      .subscribe(pj => {
        if(pj.cnpj === cnpj){
          console.log('criar uma página de dialogo bloqueando o cadastro.')
        }
      })
    }

    //salvar parceiro

    savePartner(): void {
      this.empresa.essential_service = this._serviceList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
      this.empresa.trabalho_reunioes = this._meetList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
      this.empresa.qual_idioma = this._languageList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
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
        instagram_parceiro: this.empresa.instagram_parceiro,
        tipo_service: this.empresa.tipo_service,
        tipo_estabelecimento: this.empresa.tipo_estabelecimento,
        tipo_estabelecimento_outros: this.empresa.tipo_estabelecimento_outros,
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
        espacos_culturais: this.empresa.espacos_culturais,
        idioma: this.empresa.idioma,
        qual_idioma: this.empresa.qual_idioma
      }
      //console.log('dados enviados', data)
      this.service.cadastrar_parceiro(data).subscribe({
        next: (res: any) => {
          //console.log(res);
          this.empresa.id = res.id
          //console.log("Id", this.empresa.id)
          this.submitted = true;
        },
        error: (e) => console.error(e)
      })
    }

    novoCadastroParceiro(){
      window.location.reload();
    }
/*
    novoCadastroParceiro(): void {
      this.submitted = false;
      this.getService();
      this.getMeet();
      this.empresa = {
        id: '',
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
      }
    }*/

    //anexar arquivos
    onFileUpload(){
      const imageBlob = this.fileInput.nativeElement.files[0]
      const file = new FormData()
      const user_id = this.empresa.id
      file.append('file', imageBlob)
      file.append("id", user_id);
      //console.log('formData', file)
      //console.log('id', user_id)

      this.http.post(environment.url + 'anexo' + '/'+ user_id, file).subscribe((response: any) => {
        //console.log(response)
        this.resposta_anexo = response;

        if(response=='Comprovante anexado com sucesso!'){
          this.habilita_anexo = false
        }else{
          this.habilita_anexo = true
        }
      })
    }

    alvaraUpload(){
      const imageAlvara = this.alvaraInput.nativeElement.files[0]
      const alvara = new FormData()
      const user_id = this.empresa.id
      alvara.append('file', imageAlvara)
      alvara.append("id", user_id);
      //console.log('formData', alvara)
      //console.log('id', user_id)

      this.http.post(environment.url + 'anexo_alvara' + '/'+ user_id , alvara).subscribe((response: any) => {
        //console.log(response)
        this.alvara_anexo = response;

        if(response=='Alvará anexado com Sucesso!'){
          this.habilita_anexo_alvara = false
        }else{
          this.habilita_anexo_alvara = true
        }
      })
    }

    logoUpload(){
      const imageLogo = this.logoInput.nativeElement.files[0]
      const logo = new FormData()
      const user_id = this.empresa.id
      logo.append('file', imageLogo)
      logo.append("id", user_id);
      //console.log('formData', logo)
      //console.log('id', user_id)

      this.http.post(environment.url + 'anexo_logo' + '/'+ user_id , logo).subscribe((response: any) => {
        //console.log(response)
        this.logo_anexo = response;

        if(response=='Logo enviado com Sucesso!'){
          this.habilita_anexo_logo = false
        }else{
          this.habilita_anexo_logo = true
        }
      })
    }

    selectMultipleFiles(event: any) {
      if (event.target.files.length > 0) {
        this.multipleFiles = event.target.files;
      }
    }

    imgsUpload(){
      const files = new FormData()
      const user_id = this.empresa.id

      for(let file of this.multipleFiles){
        files.append('files', file)
      }
      this.http.post(environment.url + 'anexo_imgs' + '/'+ user_id , files).subscribe((response: any) => {
        //console.log(response)
        this.logo_anexo = response;

        if(response=='Imagens enviadas com Sucesso!'){
          this.habilita_anexo_imgs = false
        }else{
          this.habilita_anexo_imgs = true
        }
      })

    }

    _serviceList!: typeService[];
    _meetList!: typeMeet[];
    _languageList!: typeLanguage[];

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

    getLanguage(){
      this._languageList=[
        { nome:"Alemão", isselected: false },
        { nome:"Chinês", isselected: false },
        { nome:"Espanhol", isselected: false },
        { nome:"Francês", isselected: false },
        { nome:"Inglês", isselected: false },
        { nome:"Italiano", isselected: false },
        { nome:"Japonês", isselected: false }
      ]
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
class typeLanguage{
  nome: string | undefined;
  isselected: boolean | undefined;
}

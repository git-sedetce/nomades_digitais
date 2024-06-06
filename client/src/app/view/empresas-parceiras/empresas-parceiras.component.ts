import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapGeocoder } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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
  lista_imagens!: any[];
  nome_empresa!: any;
  formParceria!: FormGroup
  arquivoUrl: SafeResourceUrl | null = null
  imgUrl: SafeResourceUrl | null = null;
  isLoading = false;
  endereco!: any;

  center = { lat: -3.76749831490545, lng: -38.6232867006762 }; // Coordenadas de Jurema, Caucaia - Brasil
  zoom = 12;

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private geocoder: MapGeocoder
  ) {}

  ngOnInit(): void {

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
    this.getLogo(id);
    this.getImagens(id);
    this.service.parceirosById(id).subscribe(
      (partnerID: any) => {
        setTimeout(() =>{

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
        this.endereco = partnerID.logradouro + ', ' + partnerID.numero + ' - ' + partnerID.bairro + ' - ' + partnerID.cidade + '/' + partnerID.estado;
        console.log('endereco', this.endereco);
        this.geocoder.geocode({
          address: this.endereco
        }).subscribe(({results}) => {
          console.log(results);
        });

        },2000)

        setTimeout(() =>{
          this.isLoading = true;
        },2000)
    },
    (erro: any) => {
      console.log(erro);

    }
    );
  }

  getLogo(id: any) {
    this.service.logoById(id).subscribe(
      (logo: any) => {
        const binaryString = window.atob(logo);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen)

        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
      }

      // Criar um Blob a partir do ArrayBuffer
      const blob = new Blob([bytes], { type: 'image/jpeg' });

       // Criar uma URL segura para a imagem Blob
      const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.imgUrl = imageUrl;
         console.log('imgUrl', this.imgUrl);
      },
      error => {
        console.error('Imagem não encontrada:', error);
    }
    );
  }

  getImagens(id: any){
    this.service.imagensById(id).subscribe((imagensData: any[]) => {
      this.lista_imagens = imagensData.map(imagem => {
        const decodedImage = 'data:image/jpeg;base64,' + imagem.base64;
        const safeImageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(decodedImage);
        return {
            id: imagem.id,
            tipo_anexo: imagem.tipo_anexo,
            imagem: safeImageUrl
        };
    });

       console.log('lista_imagens', this.lista_imagens)
    }, (erro: any) => console.error(erro))

  }
}

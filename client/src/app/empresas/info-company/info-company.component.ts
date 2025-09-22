import { Component, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-info-company',
  templateUrl: './info-company.component.html',
  styleUrls: ['./info-company.component.css'],
})
export class InfoCompanyComponent implements OnInit {
  lista_imagens: any[] = [];
  noInfo!: boolean;
  showInfo: boolean = false;
  showImg: boolean = false;
  showMap: boolean = false;
  imgUrl: SafeResourceUrl | null = null;
  loadingImagens: boolean = false;
  mensagemImagens: string | null = null;
  parceiro!: any;
  company_name!: string;
  type_establishment!: string;
  mapUrl!: SafeResourceUrl;
  returnHosp: boolean = false;
  returnCoworking: boolean = false;
  returnFood: boolean = false;

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private geocoder: MapGeocoder,
    private route: ActivatedRoute // ⬅️ adicionado
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.getImagens(id);
      this.takePartner(id); // chama pelo tipo
    });
  }

  takePartner(id: any) {
    this.service.parceirosById(id).subscribe(
      (partnerId: any) => {
        this.parceiro = partnerId;
        console.log('Parceiro', this.parceiro);
        this.company_name = this.parceiro.nome_fantasia;
        this.type_establishment = this.parceiro.tipo_estabelecimento;
        if(this.parceiro.tipo_service === 'hospedagem'){
          this.returnHosp = true;
        } else if(this.parceiro.tipo_estabelecimento === 'coworking'){
          this.returnCoworking = true;
        } else if(this.parceiro.tipo_service === 'alimentacao'){
          this.returnFood = true;
        }
      },
      (erro: any) => console.error(erro)
    );
  }

  getImagens(id: any) {
  this.loadingImagens = true;
  this.mensagemImagens = null;
  this.lista_imagens = [];

  this.service.imagensById(id).subscribe(
    (imagensData: any[]) => {
      this.loadingImagens = false;

      if (imagensData && imagensData.length > 0) {
        this.lista_imagens = imagensData.map((imagem) => {
          const decodedImage = 'data:image/jpeg;base64,' + imagem.base64;
          const safeImageUrl: SafeUrl =
            this.sanitizer.bypassSecurityTrustUrl(decodedImage);
          return {
            id: imagem.id,
            tipo_anexo: imagem.tipo_anexo,
            imagem: safeImageUrl,
          };
        });

        this.noInfo = false;
        this.showImg = true;   // 👈 já abre galeria por padrão
        this.showInfo = false;
        this.showMap = false;

      } else {
        this.noInfo = true;
        this.showImg = true;   // 👈 força abrir a seção galeria, mas mostra card vazio
        this.showInfo = false;
        this.showMap = false;
      }
    },
    (erro: any) => {
      this.loadingImagens = false;
      this.noInfo = true;
      this.showImg = true;     // 👈 mesmo em erro, mostra card vazio
      this.showInfo = false;
      this.showMap = false;
      console.error('Erro ao buscar imagens:', erro);
    }
  );
}

  currentIndex = 0;
  showModal = false;

  openModal(index: number) {
    this.currentIndex = index;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.lista_imagens.length) %
      this.lista_imagens.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.lista_imagens.length;
  }

  handleKey(event: KeyboardEvent) {
    if (!this.showModal) return;

    if (event.key === 'ArrowLeft') this.prevImage();
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'Escape') this.closeModal();
  }

  viewGalery() {
    this.showImg = true;
    this.showInfo = false;
    this.showMap = false;

    if (this.lista_imagens.length > 0) {
      this.noInfo = false;
    } else {
      this.noInfo = true;
    }
  }

  viewInfo() {
    this.showInfo = true;
    this.showImg = false;
    this.showMap = false;

    if (this.parceiro) {
      this.noInfo = false;
    } else {
      this.noInfo = true;
    }
  }

  viewMap() {
    this.showMap = true;
    this.showInfo = false;
    this.showImg = false;
    this.noInfo = false;

    if (this.parceiro) {
      const endereco = `${this.parceiro.logradouro} ${this.parceiro.numero}, ${this.parceiro.bairro}, ${this.parceiro.cidade} - ${this.parceiro.estado}`;
      const url = `https://www.google.com/maps?q=${encodeURIComponent(
        endereco
      )}&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}

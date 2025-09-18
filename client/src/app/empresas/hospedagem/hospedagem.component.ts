import { Component, HostListener, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-hospedagem',
  templateUrl: './hospedagem.component.html',
  styleUrls: ['./hospedagem.component.css'],
})
export class HospedagemComponent implements OnInit {
  lista_parcerias: any[][] = []; // agora é array de arrays
  allPartners: any[] = []; // mantém os dados originais
  lista_imagens: any[] = [];
  arquivoUrl: SafeResourceUrl | null = null;
  imgUrl: SafeResourceUrl | null = null;
  loadingImagens: boolean = false;
  mensagemImagens: string | null = null;

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private geocoder: MapGeocoder,
    private route: ActivatedRoute // ⬅️ adicionado
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tipo = params['tipo'];

      if (tipo) {
        this.tipoHospegadem(tipo); // chama pelo tipo
      } else {
        this.getParceiros(); // default (todas hospedagens)
      }
    });
  }

  getParceiros() {
    this.service.pegarHospedagem('hospedagem').subscribe(
      (partners: any[]) => {
        console.log('Parceiros', partners);

        // 🔹 se tiver logo em base64, monta uma URL segura
        this.allPartners = partners.map((p) => {
          if (p.logo) {
            p.logoUrl = this.sanitizer.bypassSecurityTrustUrl(
              `data:image/jpeg;base64,${p.logo}`
            );
          } else {
            p.logoUrl = '../../../assets/midia/imgs/logos/placeholder.png';
          }
          return p;
        });

        this.updateSlides();
      },
      (erro: any) => console.log(erro)
    );
  }

  // 🔹 escuta resize da tela
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSlides();
  }

  private updateSlides() {
    const width = window.innerWidth;
    let chunkSize = 2; // padrão desktop

    if (width < 768) {
      chunkSize = 1; // mobile
    } else if (width < 992) {
      chunkSize = 2; // tablet
    }

    this.lista_parcerias = this.chunkArray(this.allPartners, chunkSize);
  }

  // Função para dividir em grupos
  private chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  tipoHospegadem(tipo: string) {
    this.service.tipoHospedagem(tipo).subscribe(
      (partners: any[]) => {
        console.log('Parceiros', partners);

        // 🔹 se tiver logo em base64, monta uma URL segura
        this.allPartners = partners.map((p) => {
          if (p.logo) {
            p.logoUrl = this.sanitizer.bypassSecurityTrustUrl(
              `data:image/jpeg;base64,${p.logo}`
            );
          } else {
            p.logoUrl = '../../../assets/midia/imgs/logos/placeholder.png';
          }
          return p;
        });

        this.updateSlides();
      },
      (erro: any) => console.log(erro)
    );
  }

  getImagens(id: any) {
    this.loadingImagens = true; // inicia o loading
    this.mensagemImagens = null; // reseta mensagens
    this.lista_imagens = []; // limpa imagens anteriores
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
          console.log('imagens', this.lista_imagens);
        } else {
          this.mensagemImagens = 'Nenhuma imagem encontrada.';
        }
      },

      (erro: any) => {
        this.loadingImagens = false;
        this.mensagemImagens =
          'Erro ao buscar imagens. Tente novamente mais tarde.';
        console.error('Erro ao buscar imagens:', erro);
      }
    );
  }
}

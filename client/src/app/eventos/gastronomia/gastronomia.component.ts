import { Component, HostListener, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-gastronomia',
  templateUrl: './gastronomia.component.html',
  styleUrls: ['./gastronomia.component.css']
})
export class GastronomiaComponent implements OnInit {

  view_type: string = 'gastronomia'; // 'grid' ou 'list'
  lista_gastronomica: any[][] = []; // agora é array de arrays
  allPartners: any[] = []; // mantém os dados originais
  arquivoUrl: SafeResourceUrl | null = null;
  imgUrl: SafeResourceUrl | null = null;
  gastro_title: string = 'Gastronomia';

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private geocoder: MapGeocoder
  ) { }

  ngOnInit(): void {
  }

  return(tipo: string){
    this.view_type = tipo;
  }

  getParceiros(tipo: string) {
    this.view_type = tipo;
    this.gastro_title = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    console.log('Tipo selecionado:', tipo);
        this.service.pegarGastronomia(tipo).subscribe(
          (partners: any[]) => {
            console.log('Parceiros', partners);

            // 🔹 se tiver logo em base64, monta uma URL segura
            this.allPartners = partners.map((p) => {
              if (p.logo) {
                p.logoUrl = this.sanitizer.bypassSecurityTrustUrl(
                  `data:image/jpeg;base64,${p.logo}`
                );
              } else {
                p.logoUrl = '../../../assets/midia/imgs/logos/placeholder.png'
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
        let chunkSize = 3; // padrão desktop

        if (width < 768) {
          chunkSize = 1; // mobile
        } else if (width < 992) {
          chunkSize = 2; // tablet
        }

        this.lista_gastronomica = this.chunkArray(this.allPartners, chunkSize);
      }

      // Função para dividir em grupos
      private chunkArray(arr: any[], size: number): any[][] {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size));
        }
        return result;
      }


}

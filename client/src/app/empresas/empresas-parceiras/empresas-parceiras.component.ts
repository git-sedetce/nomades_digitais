import { Component, HostListener, OnInit } from '@angular/core';
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
  lista_coworking: any[][] = []; // agora é array de arrays
  allPartners: any[] = []; // mantém os dados originais
  arquivoUrl: SafeResourceUrl | null = null;
  imgUrl: SafeResourceUrl | null = null;

  center = { lat: -3.76749831490545, lng: -38.6232867006762 }; // Coordenadas de Jurema, Caucaia - Brasil
  zoom = 12;

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private geocoder: MapGeocoder
  ) {}

  ngOnInit(): void {

    this.getParceiros();
  }

  getParceiros() {
      this.service.pegarHospedagem('coworking').subscribe(
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

      this.lista_coworking = this.chunkArray(this.allPartners, chunkSize);
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

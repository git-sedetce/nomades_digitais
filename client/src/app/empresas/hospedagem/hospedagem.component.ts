import { Component, HostListener, OnInit } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-hospedagem',
  templateUrl: './hospedagem.component.html',
  styleUrls: ['./hospedagem.component.css'],
})
export class HospedagemComponent implements OnInit {
  lista_parcerias: any[][] = []; // agora é array de arrays
  allPartners: any[] = []; // mantém os dados originais
  arquivoUrl: SafeResourceUrl | null = null;
  imgUrl: SafeResourceUrl | null = null;

  constructor(
    private service: ParceriaService,
    private sanitizer: DomSanitizer,
    private geocoder: MapGeocoder
  ) {}

  ngOnInit(): void {
    this.getParceiros();
  }

  getParceiros() {
    this.service.pegarHospedagem('hospedagem').subscribe(
      (partner: any[]) => {
        this.allPartners = partner;
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
}

import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TemporadaNomadService } from '../services/temporada-nomad.service';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-temporada-nomad',
  templateUrl: './temporada-nomad.component.html',
  styleUrls: ['./temporada-nomad.component.css']
})
export class TemporadaNomadComponent implements OnInit {

  lista_municipio!: any[];
  lista_temporada!: any[];
  has_season: boolean = false;

  constructor(
      private cityService: ListaMinucipioService,
      private temporadaService: TemporadaNomadService,
      private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
      this.allTemporadas();
      this.listarCidade();
    }

    allTemporadas():void{
      this.temporadaService.listar_temporada('alltemporada').subscribe((season: any[]) =>{
        this.lista_temporada = season;
        console.log('lista_temporada', this.lista_temporada)
        if (this.lista_temporada && this.lista_temporada.length > 0) {
                console.log('Cidades cadastradas:', this.lista_temporada);
                this.has_season = true;

                for (let image of this.lista_temporada) {
                  if (image.base64) {
                    const binaryString = window.atob(image.base64);
                    const binaryLen = binaryString.length;
                    const bytes = new Uint8Array(binaryLen);

                    for (let i = 0; i < binaryLen; i++) {
                      bytes[i] = binaryString.charCodeAt(i);
                    }

                    const blob = new Blob([bytes], { type: 'image/jpeg' });
                    const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
                    image.imagem = imageUrl; // define imagem no objeto
                  } else {
                    image.imagem = null;
                  }
                }

              } else {
                this.has_season = false;
              }
      }, (erro: any) => console.error(erro)
    );
    }

    listarCidade():void{
      this.cityService.listar_municipio('todos_municipio')
        .subscribe((m: any[]) => {
          // console.log('lista_municipio', m);
          this.lista_municipio = m;
        }, (erro: any) => console.error(erro)
        );
    }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}

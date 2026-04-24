import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalhes-municipio',
  templateUrl: './detalhes-municipio.component.html',
  styleUrls: ['./detalhes-municipio.component.css'],
})
export class DetalhesMunicipioComponent implements OnInit {
  municipio: any;
  listaImagens: any[] = [];
  imagemSelecionada: string | null = null;
  indiceImagemAtual = 0;
  touchInicioX = 0;
  touchFimX = 0;
  loadingImagens: boolean = false;
  map: any;

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.municipioById(id).subscribe((res: any) => {
      this.municipio = res;
      setTimeout(() => {
        this.initMapaMunicipio();
      }, 200);
    });

    this.getImagens(id);
  }

  getImagens(id: any) {
    this.loadingImagens = true;
    this.listaImagens = [];

    this.service.imagensMunicipioById(id).subscribe(
      (imagemCity: any) => {
        this.loadingImagens = false;

        if (imagemCity && imagemCity.length > 0) {
          this.listaImagens = imagemCity.map((imagem: any) => {
            const decodedImage = 'data:image/jpeg;base64,' + imagem.base64;
            const safeImageUrl: SafeUrl =
              this.sanitizer.bypassSecurityTrustUrl(decodedImage);
            return {
              id: imagem.id,
              tipo_turismo: imagem.tipo_turismo,
              imagem: safeImageUrl,
            };
          });
        } else {
        }
      },
      (erro: any) => {
        this.loadingImagens = false;
        console.error('Erro ao buscar imagens:', erro);
      },
    );
  }

  abrirImagem(index: number) {
    this.indiceImagemAtual = index;
    this.imagemSelecionada = this.listaImagens[index].imagem;
  }

  fecharImagem() {
    this.imagemSelecionada = null;
  }

  proximaImagem(event?: Event) {
    if (event) event.stopPropagation();

    this.indiceImagemAtual =
      (this.indiceImagemAtual + 1) % this.listaImagens.length;

    this.imagemSelecionada = this.listaImagens[this.indiceImagemAtual].imagem;
  }

  imagemAnterior(event?: Event) {
    if (event) event.stopPropagation();

    this.indiceImagemAtual =
      (this.indiceImagemAtual - 1 + this.listaImagens.length) %
      this.listaImagens.length;

    this.imagemSelecionada = this.listaImagens[this.indiceImagemAtual].imagem;
  }

  touchStart(event: TouchEvent) {
    this.touchInicioX = event.changedTouches[0].screenX;
  }

  touchEnd(event: TouchEvent) {
    this.touchFimX = event.changedTouches[0].screenX;
    this.verificarSwipe();
  }

  verificarSwipe() {
    const distancia = this.touchInicioX - this.touchFimX;

    if (Math.abs(distancia) < 50) return;

    if (distancia > 0) {
      this.proximaImagem();
    } else {
      this.imagemAnterior();
    }
  }

  initMapaMunicipio() {
    const nomeMunicipio =
      this.municipio?.ass_cadastra_municipios_cidade?.nome_municipio
        ?.toLowerCase()
        .trim();

    if (!nomeMunicipio) return;

    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('mapaMunicipio', {
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(this.map);

    this.http.get<any>('assets/geojson/geojs-mun.json').subscribe((geojson) => {
      let municipioLayer: any;

      const camada = L.geoJSON(geojson, {
        style: (feature: any) => {
          const nomeGeo = feature.properties.name?.toLowerCase().trim();

          if (nomeGeo === nomeMunicipio) {
            return {
              color: '#d4a017',
              weight: 2,
              fillColor: '#f7c948',
              fillOpacity: 0.7,
            };
          }

          return {
            color: '#999',
            weight: 1,
            fillColor: '#ddd',
            fillOpacity: 0.35,
          };
        },

        onEachFeature: (feature: any, layer: any) => {
          const nomeGeo = feature.properties.name?.toLowerCase().trim();

          if (nomeGeo === nomeMunicipio) {
            municipioLayer = layer;
            layer.bindPopup(
              this.municipio.ass_cadastra_municipios_cidade?.nome_municipio,
            );
          }
        },
      }).addTo(this.map);

      if (municipioLayer) {
        this.map.fitBounds(municipioLayer.getBounds(), {
          padding: [20, 20],
        });

        municipioLayer.openPopup();
      }
    });
  }

  voltar() {
    window.history.back();
  }
}

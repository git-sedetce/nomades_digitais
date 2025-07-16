import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { ServiceService } from '../services/service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tipo-turismo',
  templateUrl: './tipo-turismo.component.html',
  styleUrls: ['./tipo-turismo.component.css'],
})
export class TipoTurismoComponent implements OnInit {
  lista_regiao!: any[];
  lista_cidades!: any[];
  lista_cidades_cadastradas!: any[];
  cidadesFiltradas: any[] = [];
  tipo_turismo!: any;
  has_city: boolean = false; // Verifica se há cidades
  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página
  isLoading = false;
  turismo_selected: boolean = false;
  imgUrl: SafeResourceUrl | null = null;

  // Lista de estilos de turismo
  lista_estilo_turismo = [
    { id: 1, nome: 'Ecológico' },
    { id: 2, nome: 'Praiano' },
    { id: 3, nome: 'Radical' },
    { id: 4, nome: 'Religioso' },
    { id: 5, nome: 'Serrano' },
    { id: 6, nome: 'Sertanejo' },
  ];

  constructor(
    private estadoService: ListaMinucipioService,
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.apresentar06Cidades();
    this.pegarRegiao();
    this.pegarCidade();
  }

  // Método para obter o nome do estilo de turismo (já estava bom, apenas mantido)
  pegarTipoTurismo(name: any) {
    this.service.cidadeporTurismo(name).subscribe(
      (data: any) => {
        this.lista_cidades_cadastradas = data;

      if (this.lista_cidades_cadastradas && this.lista_cidades_cadastradas.length > 0) {
        console.log('Cidades cadastradas:', this.lista_cidades_cadastradas);
        this.has_city = true;

        for (let image of this.lista_cidades_cadastradas) {
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
        this.has_city = false;
      }
    },
    (erro: any) => console.error(erro)
  );
      }

      limparFiltro() {
        this.apresentar06Cidades();
      }


  apresentar06Cidades() {
  this.service.cidades12('pegaImageCity6').subscribe(
    (data: any) => {
      this.lista_cidades_cadastradas = data;

      if (this.lista_cidades_cadastradas && this.lista_cidades_cadastradas.length > 0) {
        console.log('Cidades cadastradas:', this.lista_cidades_cadastradas);
        this.has_city = true;

        for (let image of this.lista_cidades_cadastradas) {
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
        this.has_city = false;
      }
    },
    (erro: any) => console.error(erro)
  );
}

  pegarRegiao() {
    this.estadoService.listar_regiao('regiao').subscribe(
      (data: any) => {
        this.lista_regiao = data;
        console.log('Regiões:', this.lista_regiao);
      },
      (erro: any) => console.error(erro)
    );
  }

  pegarCidade() {
    this.estadoService.listar_municipio('todos_municipio').subscribe(
      (data: any) => {
        this.lista_cidades = data;
        console.log('Cidades:', this.lista_cidades);
      },
      (erro: any) => console.error(erro)
    );
  }

  filtrarMunicipio(cidade: any) {
    console.log('cidade', cidade);
    this.estadoService
      .pegar_municipio('municipio/', cidade)
      .subscribe((city: any) => {
        console.log('city', city);
        // this.cadastro_city.cod_ibge = city.cod_ibge
      });
  }

  saibaMais(id: any) {
    console.log('ID da cidade selecionada:', id);
  }
}

import { Component, OnInit } from '@angular/core';

import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ListaMinucipioService } from 'src/app/service/listarmunicipio/lista-minucipio.service';
import { ServiceService } from 'src/app/services/service.service';

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
  itemsPerPage: number = 6; // Itens por página
  isLoading = false;
  turismo_selected: boolean = false;
  imgUrl: SafeResourceUrl | null = null;

  searchTerm: string = '';
  currentPage: number = 1;
  filteredCities: any[] = [];
  paginatedCities: any[] = [];
  totalPages: number = 0;
  pages: number[] = [];

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
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.apresentar06Cidades();
    this.pegarRegiao();
    this.pegarCidade();
  }

  //processar as imagens para exibição
  processarImagens(lista: any[]) {
    for (let image of lista) {
      if (image.base64) {
        const binaryString = window.atob(image.base64);

        const binaryLen = binaryString.length;

        const bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'image/jpeg' });

        const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(blob),
        );

        image.imagem = imageUrl;
      } else {
        image.imagem = null;
      }
    }
  }

  // Método para obter o nome do estilo de turismo (já estava bom, apenas mantido)

  apresentar06Cidades() {
    this.service.cidades12('pegaImageCity6').subscribe(
      (data: any) => {
        this.lista_cidades_cadastradas = data;

        this.filteredCities = [...data];

        this.processarImagens(this.filteredCities);

        this.has_city = this.filteredCities.length > 0;

        this.setupPagination();
      },

      (erro: any) => console.error(erro),
    );
  }

  pegarTipoTurismo(name: any) {
    this.tipo_turismo = name;

    this.turismo_selected = true;

    this.service.cidadeporTurismo(name).subscribe(
      (data: any) => {
        this.lista_cidades_cadastradas = data;

        this.filteredCities = [...data];

        this.processarImagens(this.filteredCities);

        this.has_city = this.filteredCities.length > 0;

        this.currentPage = 1;

        this.setupPagination();
      },

      (erro: any) => console.error(erro),
    );
  }

  filtrarCards() {
    const termo = this.searchTerm.toLowerCase();

    this.filteredCities = this.lista_cidades_cadastradas.filter(
      (cidade: any) => {
        return (
          cidade.cidade.toLowerCase().includes(termo) ||
          cidade.tipo_turismo.toLowerCase().includes(termo) ||
          cidade.regiao.toLowerCase().includes(termo)
        );
      },
    );

    this.currentPage = 1;

    this.setupPagination();
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.filteredCities.length / this.itemsPerPage);

    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);

    this.updatePaginatedCities();
  }

  updatePaginatedCities() {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    const end = start + this.itemsPerPage;

    this.paginatedCities = this.filteredCities.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;

    this.updatePaginatedCities();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.updatePaginatedCities();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.updatePaginatedCities();
    }
  }

  limparFiltro() {
    this.searchTerm = '';

    this.turismo_selected = false;

    this.currentPage = 1;

    this.apresentar06Cidades();
  }

  pegarRegiao() {
    this.estadoService.listar_regiao('regiao').subscribe(
      (data: any) => {
        this.lista_regiao = data;
        // console.log('Regiões:', this.lista_regiao);
      },
      (erro: any) => console.error(erro),
    );
  }

  pegarCidade() {
    this.estadoService.listar_municipio('todos_municipio').subscribe(
      (data: any) => {
        this.lista_cidades = data;
        // console.log('Cidades:', this.lista_cidades);
      },
      (erro: any) => console.error(erro),
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
    this.router.navigate(['/municipio/tipo-turismo/detalhes', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { EventoServiceService } from '../services/evento-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tipo-turismo',
  templateUrl: './tipo-turismo.component.html',
  styleUrls: ['./tipo-turismo.component.css'],
})
export class TipoTurismoComponent implements OnInit {
  lista_regiao!: any[];
  lista_cidades!: any[];
  cidadesFiltradas: any[] = [];
  tipo_turismo!: any;
  has_city: boolean = false; // Verifica se há cidades
  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página
  isLoading = false;
  turismo_selected: boolean = false;

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
    private eventoService: EventoServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pegarRegiao();
    this.pegarCidade();
  }

  // Método para obter o nome do estilo de turismo (já estava bom, apenas mantido)
  pegarTipoTurismo(id: any): string | undefined {
    const estiloEncontrado = this.lista_estilo_turismo.find(
      (estilo) => estilo.id === id
    );

    if (estiloEncontrado) {
      this.tipo_turismo = estiloEncontrado.nome;
      return estiloEncontrado.nome;
    }

    return undefined;
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
}

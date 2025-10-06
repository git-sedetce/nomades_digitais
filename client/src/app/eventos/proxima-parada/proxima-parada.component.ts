import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../../service/listarmunicipio/lista-minucipio.service';
import { EventoServiceService } from '../../services/evento-service.service';
import { Evento } from '../../models/evento.model';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-proxima-parada',
  templateUrl: './proxima-parada.component.html',
  styleUrls: ['./proxima-parada.component.css'],
})
export class ProximaParadaComponent implements OnInit {
  evento!: Evento;
  lista_regiao!: any[];
  lista_eventos!: any[];
  lista_cidades!: any[];
  has_event!: boolean; // Verifica se há eventos
  has_image!: boolean; // Verifica se há imagem
  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página
  isLoading = false;
  imgUrl: SafeResourceUrl | null = null;

  eventosFiltrados: any[] = [];

  dataInicioFiltro: string = '';
  dataFimFiltro: string = '';

  constructor(
    private estadoService: ListaMinucipioService,
    private eventoService: EventoServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pegarRegiao();
    this.pegarCidade();
    this.pegarEventos();
    this.evento = new Evento();
  }

  pegarRegiao() {
    this.estadoService.listar_regiao('regiao').subscribe(
      (data: any) => {
        this.lista_regiao = data;
        // console.log('Regiões:', this.lista_regiao);
      },
      (erro: any) => console.error(erro)
    );
  }

  pegarCidade() {
    this.estadoService.listar_municipio('todos_municipio').subscribe(
      (data: any) => {
        this.lista_cidades = data;
        // console.log('Cidades:', this.lista_cidades);
      },
      (erro: any) => console.error(erro)
    );
  }

  pegarEventos() {
    this.eventoService.listar_eventos('eventos').subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.has_event = true; // Define que há eventos
          this.lista_eventos = data;
          // console.log('Eventos:', this.lista_eventos);
          this.eventosFiltrados = [...this.lista_eventos];
          this.dataInicioFiltro = ''
          this.dataFimFiltro = ''
        } else {
          this.has_event = false; // Define que não há eventos
          // console.log('Nenhum evento encontrado');
        }
      },
      (erro: any) => console.error(erro)
    );
  }

  filtrarMunicipio(cidade: any) {
    this.estadoService
      .pegar_municipio('municipio/', cidade)
      .subscribe((city: any) => {
        // console.log('city', city);
        // this.cadastro_city.cod_ibge = city.cod_ibge
        this.pegarEventosByCity(city.id);
      });
  }

  pegarEventosByCity(id: any) {
    //id = this.id_regiao
    this.eventoService.pegar_evento('eventocidade/', id).subscribe(
      (evento: any) => {
        if (evento.length > 0) {
          this.eventosFiltrados = evento;
          this.has_event = true; // Define que há eventos
          // console.log('Eventos por cidade:', this.eventosFiltrados);
        } else {
          this.has_event = false; // Define que não há eventos
        }
      },
      (erro: any) => console.error(erro)
    );
  }

  pegarEventosByRegiao(id: any) {
    //id = this.id_regiao
    this.eventoService.pegar_evento('eventoregiao/', id).subscribe(
      (evento: any) => {
        if (evento.length > 0) {
          this.eventosFiltrados = evento;
          this.has_event = true; // Define que há eventos
          // console.log('Eventos por cidade:', this.eventosFiltrados);
        } else {
          this.has_event = false; // Define que não há eventos
        }
      },
      (erro: any) => console.error(erro)
    );
  }

  saibaMais(id: any) {
    this.eventoService.eventoById(id).subscribe(
      (evento: any) => {
        setTimeout(() => {
          this.getImagem(id);
          this.evento = evento;
          // console.log('Evento selecionado:', this.evento);
        }, 2000);

        setTimeout(() => {
          this.isLoading = true;
        }, 2000);
      },
      (erro: any) => {
        console.error('Erro ao buscar evento:', erro);
      }
    );
  }

  getImagem(id: any) {
    this.eventoService.imagem_eventoById(id).subscribe(
      (logo: any) => {
        const binaryString = window.atob(logo);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Criar um Blob a partir do ArrayBuffer
        const blob = new Blob([bytes], { type: 'image/jpeg' });

        // Criar uma URL segura para a imagem Blob
        const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(blob)
        );
        this.imgUrl = imageUrl;
        this.has_image = true; // Define que há imagem
        //  console.log('imgUrl', this.imgUrl);
      },
      (error) => {
        this.has_image = false; // Define que não há imagem
        console.error('Imagem não encontrada:', error);
      }
    );
  }

  filtrarPorData() {
    if (!this.dataInicioFiltro || !this.dataFimFiltro) {
      this.eventosFiltrados = [...this.lista_eventos];
      return;
    }

    const dataInicio = new Date(this.dataInicioFiltro);
    const dataFim = new Date(this.dataFimFiltro);
    dataFim.setHours(23, 59, 59, 999); // inclui o último dia inteiro

    this.eventosFiltrados = this.lista_eventos.filter((evento) => {
      const dataEvento = new Date(evento.data_inicio_evento);
      return dataEvento >= dataInicio && dataEvento <= dataFim;
    });
  }
}

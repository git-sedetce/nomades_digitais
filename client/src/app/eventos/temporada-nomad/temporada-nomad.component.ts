import { Component, HostListener, OnInit } from '@angular/core';
// import { OwlOptions } from 'ngx-owl-carousel-o';
import { TemporadaNomadService } from '../../services/temporada-nomad.service';
import { ListaMinucipioService } from '../../service/listarmunicipio/lista-minucipio.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-temporada-nomad',
  templateUrl: './temporada-nomad.component.html',
  styleUrls: ['./temporada-nomad.component.css'],
})
export class TemporadaNomadComponent implements OnInit {
  lista_municipio!: any[];
  lista_temporada!: any[];
  listaPaginada: any[][] = []; // 🔹 armazenar páginas com 4 eventos cada
  has_season: boolean = false;
  itensPorPagina: number = 4; // padrão desktop

  eventosFiltrados: any[] = []; // 🔹 eventos de acordo com o filtro
  mensagem: string = '';        // 🔹 mensagem quando não há eventos
  texto: string = '';        // 🔹 o que fazer

  constructor(
    private cityService: ListaMinucipioService,
    private temporadaService: TemporadaNomadService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.allTemporadas();
    this.listarCidade();
    this.definirItensPorPagina();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.definirItensPorPagina();
    if (this.lista_temporada && this.lista_temporada.length > 0) {
      this.listaPaginada = this.chunkArray(this.lista_temporada, this.itensPorPagina);
    }
  }

  definirItensPorPagina() {
    const largura = window.innerWidth;
    if (largura >= 992) {
      this.itensPorPagina = 4; // desktop
    } else if (largura >= 768) {
      this.itensPorPagina = 2; // tablet
    } else {
      this.itensPorPagina = 1; // celular
    }
  }

  allTemporadas(): void {
    this.temporadaService.listar_temporada('alltemporada').subscribe(
      (season: any[]) => {
        this.lista_temporada = season;

        if (this.lista_temporada && this.lista_temporada.length > 0) {
          this.has_season = true;

          // 🔹 Converte imagens
          for (let image of this.lista_temporada) {
            if (image.base64) {
              const binaryString = window.atob(image.base64);
              const binaryLen = binaryString.length;
              const bytes = new Uint8Array(binaryLen);

              for (let i = 0; i < binaryLen; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }

              const blob = new Blob([bytes], { type: 'image/jpeg' });
              const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(blob)
              );
              image.imagem = imageUrl;
            } else {
              image.imagem = null;
            }
          }

          // 🔹 Pagina lista em grupos de 4
          this.listaPaginada = this.chunkArray(this.lista_temporada, 4);
        } else {
          this.has_season = false;
        }
        this.eventoHoje();
      },
      (erro: any) => console.error(erro)
    );
  }

  // 🔹 Função para dividir em páginas de N itens
  public chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  listarCidade(): void {
    this.cityService.listar_municipio('todos_municipio').subscribe(
      (m: any[]) => {
        // console.log('lista_municipio', m);
        this.lista_municipio = m;
      },
      (erro: any) => console.error(erro)
    );
  }

   // ========================================================
  // 🔹 FUNÇÕES DE FILTRO DE EVENTOS
  // ========================================================

  private atualizarEventos(lista: any[]) {
    if (lista.length > 0) {
      this.eventosFiltrados = lista;
      this.mensagem = '';
    } else {
      this.eventosFiltrados = [];
      this.mensagem = 'Nenhum evento encontrado';
    }
  }

  eventoHoje(): void {
  const hoje = new Date();
  const hojeFormatado = hoje.toISOString().split('T')[0];
  // 🔹 Isso gera "2025-09-12"
  this.texto = 'hoje?';
  const eventosHoje = this.lista_temporada.filter(ev => ev.data_evento === hojeFormatado);
  // console.log('Eventos hoje:', eventosHoje);
  this.atualizarEventos(eventosHoje);
}

  eventoAmanha(): void {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const filtrados = this.lista_temporada?.filter(
      e => new Date(e.data_evento).toDateString() === amanha.toDateString()
    ) || [];
    this.atualizarEventos(filtrados);
    this.texto = 'amanhã?';
  }

  eventoNaSemana(): void {
    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setDate(hoje.getDate() - hoje.getDay() + 1); // segunda
    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 6); // domingo

    const filtrados = this.lista_temporada?.filter(
      e => new Date(e.data_evento) >= inicio && new Date(e.data_evento) <= fim
    ) || [];
    this.atualizarEventos(filtrados);
    this.texto = 'nesta semana?';
  }

  eventoWeekend(): void {
    const hoje = new Date();
    const sabado = new Date(hoje);
    sabado.setDate(hoje.getDate() + (6 - hoje.getDay()));
    const domingo = new Date(sabado);
    domingo.setDate(sabado.getDate() + 1);

    const filtrados = this.lista_temporada?.filter(
      e => new Date(e.data_evento) >= sabado && new Date(e.data_evento) <= domingo
    ) || [];
    this.atualizarEventos(filtrados);
    this.texto = 'neste final de semana?';
  }

  eventoNextWeek(): void {
    const hoje = new Date();
    const inicio = new Date(hoje);
    inicio.setDate(hoje.getDate() + (8 - hoje.getDay())); // próxima segunda
    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 6);

    const filtrados = this.lista_temporada?.filter(
      e => new Date(e.data_evento) >= inicio && new Date(e.data_evento) <= fim
    ) || [];
    this.atualizarEventos(filtrados);
    this.texto = 'na próxima semana?';
  }

  eventoMonth(): void {
    const hoje = new Date();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();

    const filtrados = this.lista_temporada?.filter(
      e => new Date(e.data_evento).getMonth() === mes &&
           new Date(e.data_evento).getFullYear() === ano
    ) || [];
    this.atualizarEventos(filtrados);
    this.texto = 'neste mês?';
  }



}

import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { EventoServiceService } from '../services/evento-service.service';

@Component({
  selector: 'app-proxima-parada',
  templateUrl: './proxima-parada.component.html',
  styleUrls: ['./proxima-parada.component.css'],
})
export class ProximaParadaComponent implements OnInit {
  lista_regiao!: any[];
  lista_eventos!: any[];
  lista_cidades!: any[];
  has_event!: boolean; // Verifica se há eventos
  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  constructor(
    private estadoService: ListaMinucipioService,
    private eventoService: EventoServiceService
  ) {}

  ngOnInit(): void {
    this.pegarRegiao();
    this.pegarCidade();
    this.pegarEventos();
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

  pegarEventos() {
    this.eventoService.listar_eventos('eventos').subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.has_event = true; // Define que há eventos
          this.lista_eventos = data;
        console.log('Eventos:', this.lista_eventos);
        }else{
          this.has_event = false; // Define que não há eventos
          console.log('Nenhum evento encontrado');
        }
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
        this.pegarEventosByCity(city.id);
      });
  }

  pegarEventosByCity(id: any) {
    //id = this.id_regiao
    this.eventoService.pegar_evento('eventocidade/', id).subscribe(
      (evento: any) => {
        if(evento.length > 0) {
          this.lista_eventos = evento;
          this.has_event = true; // Define que há eventos
          console.log('Eventos por cidade:', this.lista_eventos);
        } else {
          this.has_event = false; // Define que não há eventos
        }
      },
      (erro: any) => console.log(erro)
    );
  }

  pegarEventosByRegiao(id: any) {
    //id = this.id_regiao
    this.eventoService.pegar_evento('eventoregiao/', id).subscribe(
      (evento: any) => {
        if(evento.length > 0) {
          this.lista_eventos = evento;
          this.has_event = true; // Define que há eventos
          console.log('Eventos por cidade:', this.lista_eventos);
        } else {
          this.has_event = false; // Define que não há eventos
        }
      },
      (erro: any) => console.log(erro)
    );
  }
}

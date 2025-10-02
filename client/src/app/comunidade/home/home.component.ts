import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunidadeService } from 'src/app/services/comunidade.service';
import { EventoServiceService } from 'src/app/services/evento-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  show_info: boolean = false;
  comunidade_name: string = '';
  comunidade!: any;
  lista_comunidades: any[] = [];
  lista_eventos_community: any[] = [];
  lista_eventos_community_freq: any[] = [];
  private coresBase: string[] = [
    '#f70d54', // rosa
    '#009bb7', // azul
    '#80332c', // marrom
    '#d09c3f', // dourado
    '#60b746', // verde
    '#7a8e9f', // cinza azulado
    '#048877', // verde petróleo
    '#f75008', // laranja
    '#935a2c', // marrom claro
  ];

  constructor(
    private community: ComunidadeService,
    private eventoService: EventoServiceService,
    private router: Router) {}

  ngOnInit(): void {
    this.pegarComunidades();
  }

  pegarComunidades() {
    this.community.getCommunity('getonlycomunity').subscribe(
      (comn: any[]) => {
        let cores = [...this.coresBase];

        // se houver mais comunidades do que cores, gera cores extras
        if (comn.length > cores.length) {
          const extras = comn.length - cores.length;
          for (let i = 0; i < extras; i++) {
            cores.push(this.generateRandomColor());
          }
        }

        // embaralha as cores
        const coresEmbaralhadas = this.shuffleArray(cores);

        // aplica as cores
        this.lista_comunidades = comn.map((c, index) => ({
          ...c,
          color: coresEmbaralhadas[index],
        }));
      },
      (erro: any) => console.log(erro)
    );
  }

  /** Embaralha um array (Fisher-Yates shuffle) */
  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /** Gera uma cor aleatória em formato HEX */
  private generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  verComunidade(id: any, comunidade: string) {
    console.log('ver comunidade', id);
    this.show_info = true;
    this.comunidade_name = comunidade;
    this.community.getCommunityById(id).subscribe(
      (resp: any) => {
        this.comunidade = resp;
        this.pegarEventosComunity(id);
        console.log("resp", this.comunidade);
      },
      (erro: any) => console.log(erro)
    );
  }

  pegarEventosComunity(id: any) {
    //id = this.id_regiao
    this.eventoService.pegar_evento_community('eventocommunity/', id).subscribe(
      (evento: any) => {
          this.lista_eventos_community = evento;
          console.log('Eventos por cidade:', this.lista_eventos_community);
      },
      (erro: any) => console.log(erro)
    );

    this.eventoService.pegar_evento_community_frequency('eventcommunity/', id).subscribe(
      (evento: any) => {
          this.lista_eventos_community_freq = evento;
          console.log('Eventos por cidade com frequência:', this.lista_eventos_community_freq);
      },
      (erro: any) => console.log(erro)
    );
  }

  return() {
    this.show_info = false;
  }

  retorno() {
    this.router.navigate(['home']);
  }
}

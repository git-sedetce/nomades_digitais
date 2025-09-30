import { Component, OnInit } from '@angular/core';
import { ComunidadeService } from 'src/app/services/comunidade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  show_info: boolean = false;
  comunidade_name: string = '';
  lista_comunidades: any[] = [];
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

  constructor(private community: ComunidadeService) {}

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
  }

  return(){
    this.show_info = false;
  }
}

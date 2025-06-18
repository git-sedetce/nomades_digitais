import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';

@Component({
  selector: 'app-ceara_pronto',
  templateUrl: './ceara_pronto.component.html',
  styleUrls: ['./ceara_pronto.component.css'],
})
export class Ceara_prontoComponent implements OnInit {
  lista_municipio!: any[];
  munInfo!: any;

  constructor(public services: ListaMinucipioService) {}

  ngOnInit() {
    this.services.listar_municipio('dados_municipio').subscribe(
      (m: any[]) => {
        // console.log('lista_municipio', m);
        this.lista_municipio = m;
      },
      (erro: any) => console.log(erro)
    );
  }

  onMapClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const id = target.id;
  if (id) {
    this.munInfo = this.lista_municipio.find((m) => String(m.id) === id);
    // console.log('Municipio Info:', this.munInfo);
  }
}
}

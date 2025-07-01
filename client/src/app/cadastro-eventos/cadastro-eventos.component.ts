import { Component, ViewChild } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { NgForm } from '@angular/forms';
import { Evento } from '../models/evento.model';

@Component({
  selector: 'app-cadastro-eventos',
  templateUrl: './cadastro-eventos.component.html',
  styleUrls: ['./cadastro-eventos.component.css'],
})
export class CadastroEventosComponent {

  @ViewChild('formEvento') formEvento!: NgForm;
  evento!: Evento;

  lista_municipio!: any[];
  municipio!: any[];
  maxChars = 500
  qtdeChars = 255
  nome_regiao!: any;
  nome_cidade!: any;

  constructor(public services: ListaMinucipioService) {}

  ngOnInit(): void {
    this.evento = new Evento();
    this.services.listar_municipio('todos_municipio').subscribe(
      (m: any[]) => {
        //console.log('lista_municipio', m);
        this.lista_municipio = m;
      },
      (erro: any) => console.log(erro)
    );
  }

  localizaregiao(cidade: any, form: any) {
    console.log('cidade', cidade)
    this.services
      .pegar_municipio('municipio/', cidade)
      .subscribe((regiao: any) => {
        console.log('regiao', regiao);
        // this.cadastro_cidade.cod_ibge = regiao.cod_ibge
        this.evento.city_id = regiao.id;
        this.pegarnomeRegiao(regiao.regiao_id);
      });
  }

  pegarnomeRegiao(id: any) {
    //id = this.id_regiao
    this.services.pegar_regiao('regiao/', id).subscribe(
      (id_r: any) => {
        console.log(id_r)
        this.evento.regiao_id = id_r.id
        this.nome_regiao = id_r.nome;
      },
      (erro: any) => console.log(erro)
    );
  }

  salvarEvento():void {
    console.log('evento', this.evento);
  }
}

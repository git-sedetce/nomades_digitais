import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento.model';
import { ListaMinucipioService } from 'src/app/service/listarmunicipio/lista-minucipio.service';
import { EventoServiceService } from 'src/app/services/evento-service.service';
import { ComunidadeService } from 'src/app/services/comunidade.service';

@Component({
  selector: 'app-cadastro-eventos',
  templateUrl: './cadastro-eventos.component.html',
  styleUrls: ['./cadastro-eventos.component.css'],
})
export class CadastroEventosComponent {
  @ViewChild('formEvento') formEvento!: NgForm;
  @ViewChild('fileInput') fileInput!: ElementRef;
  evento!: Evento;

  lista_municipio!: any[];
  municipio!: any[];
  maxChars = 500;
  qtdeChars = 255;
  nome_regiao!: any;
  nome_cidade!: any;
  lista_comunidades!: any[];

  constructor(
    public services: ListaMinucipioService,
    private http: HttpClient,
    public eventoService: EventoServiceService,
    private community: ComunidadeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.evento = new Evento();
    this.services.listar_municipio('todos_municipio').subscribe(
      (m: any[]) => {
        //console.log('lista_municipio', m);
        this.lista_municipio = m;
      },
      (erro: any) => console.error(erro)
    );

    this.pegarComunidades();
  }

  pegarComunidades() {
    this.community.getCommunity('getonlycomunity').subscribe(
      (comn: any[]) => {
        this.lista_comunidades = comn;
      },
      (erro: any) => console.log(erro)
    );
  }

  localizaregiao(cidade: any, form: any) {
    // console.log('cidade', cidade);
    this.services
      .pegar_municipio('municipio/', cidade)
      .subscribe((regiao: any) => {
        // console.log('regiao', regiao);
        // this.cadastro_cidade.cod_ibge = regiao.cod_ibge
        this.evento.city_id = regiao.id;
        this.pegarnomeRegiao(regiao.regiao_id);
      });
  }

  pegarnomeRegiao(id: any) {
    //id = this.id_regiao
    this.services.pegar_regiao('regiao/', id).subscribe(
      (id_r: any) => {
        // console.log(id_r);
        this.evento.regiao_id = id_r.id;
        this.nome_regiao = id_r.nome;
      },
      (erro: any) => console.error(erro)
    );
  }

  salvarEvento(): void {
    // console.log('evento', this.evento);
    this.eventoService.cadastrarEvento(this.evento).subscribe({
      next: (res: any) => {
        const evento_id = res.id;
        this.toastr.success('Atração cadastrada com sucesso!');
        this.formEvento.reset();

        const img = this.fileInput.nativeElement.files[0];
        const file = new FormData();
        file.append('file', img);
        //console.log('formData', file)
        //console.log('id', user_id)

        this.http
          .post(environment.url + 'anexoevento' + '/' + evento_id, file)
          .subscribe({
            next: (response: any) => {

              // console.log('resposta_anexo', this.resposta_anexo);
            },
            error: (e) => {
              console.error('resposta_anexo', e);
            },
          });
      },
      error: (e) => this.toastr.error(e.message),
    });
  }
}

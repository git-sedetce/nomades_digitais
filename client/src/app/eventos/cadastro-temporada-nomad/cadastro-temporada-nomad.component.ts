import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TemporadaNomad } from 'src/app/models/nomad/temporada-nomad.model';
import { ListaMinucipioService } from 'src/app/service/listarmunicipio/lista-minucipio.service';
import { TemporadaNomadService } from 'src/app/services/temporada-nomad.service';

@Component({
  selector: 'app-cadastro-temporada-nomad',
  templateUrl: './cadastro-temporada-nomad.component.html',
  styleUrls: ['./cadastro-temporada-nomad.component.css']
})
export class CadastroTemporadaNomadComponent implements OnInit {

  @ViewChild("formTemporada") formTemporada!: NgForm
  @ViewChild('imageTemporada') imageTemporada!: ElementRef;
  temporadaNomad!: TemporadaNomad

  lista_municipio!: any[];
  maxChars = 5000

  constructor(
    private cityService: ListaMinucipioService,
    private temporadaService: TemporadaNomadService,
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // Initialization logic can go here
    this.temporadaNomad = new TemporadaNomad();

    this.cityService.listar_municipio('todos_municipio')
      .subscribe((m: any[]) => {
        // console.log('lista_municipio', m);
        this.lista_municipio = m;
      }, (erro: any) => console.error(erro)
      );
  }

  // Additional methods for handling form submission, validation, etc. can be added here

    saveSeasson(): void {
        // console.log('temporada', this.temporadaNomad);
        this.temporadaService.cadastrarTemporada(this.temporadaNomad).subscribe({
          next: (res: any) => {
            const temporada_id = res.id;
            this.toastr.success('Atração cadastrada com sucesso!');
            this.formTemporada.reset();

            const img = this.imageTemporada.nativeElement.files[0];
            const file = new FormData();
            file.append('file', img);
            //console.log('formData', file)
            //console.log('id', user_id)

            this.http
              .post(environment.url + 'imagemTemporada' + '/' + temporada_id, file)
              .subscribe({
                next: (response: any) => {

                  this.toastr.success(response.message);

                  // console.log('resposta_anexo', response.message);
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

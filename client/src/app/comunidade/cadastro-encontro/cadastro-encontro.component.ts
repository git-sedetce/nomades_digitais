import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncontrosComunidade } from 'src/app/models/comunidade/encontros-comunidade.model';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';

@Component({
  selector: 'app-cadastro-encontro',
  templateUrl: './cadastro-encontro.component.html',
  styleUrls: ['./cadastro-encontro.component.css']
})
export class CadastroEncontroComponent implements OnInit {

  @ViewChild("formMetting") formMetting!: NgForm

  meeting!: EncontrosComunidade;
  maxChars = 500;
  qtdeChars = 255;
  maxChars_link = 150;
  cepError: string | null = null; // guarda a mensagem de erro
  loadingCep = false; // mostra spinner enquanto consulta

  constructor(
    private toastr: ToastrService,
    private cepsService: ConsultaCepService,
  ) { }

  ngOnInit(): void {
    this.meeting = new EncontrosComunidade();
  }


  //preencher o endereço usando o cep

  consultaCEP(cep: string, form: NgForm) {
    this.cepError = null; // limpa erro anterior
    this.loadingCep = true;

    this.cepsService.buscar(cep).subscribe({
      next: dados => {
        if (!dados.erro) {
          this.populaForm(dados);
        } else {
          this.cepError = 'CEP não encontrado. Verifique e tente novamente.';
        }
        this.loadingCep = false;
      },
      error: () => {
        this.cepError = 'Erro ao consultar o CEP. Tente novamente mais tarde.';
        this.loadingCep = false;
      }
    });
  }

  populaForm(dados: any) {
    this.meeting.logradouro = dados.logradouro;
    this.meeting.bairro = dados.bairro;
    this.meeting.cidade = dados.localidade;
    this.meeting.estado = dados.uf;
  }

  //fim do metodo cep

  saveMeeting(form?: NgForm){
    console.log(this.meeting)
    this.toastr.success('Ponto de Encontro cadastrado com sucesso!')
    this.formMetting.reset()
  }

}

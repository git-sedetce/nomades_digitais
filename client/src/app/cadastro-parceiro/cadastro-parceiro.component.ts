import { Component, OnInit } from '@angular/core';
import { ConsultaCepService }from '../service/consulta-cep.service';


@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {

  radio_service:any;


  submitParceiro(parceiro:any){
    console.log(parceiro)
  }

  constructor(private cepsService: ConsultaCepService) { }

  ngOnInit() {
  }

  consultaCEP(cep: any, form: any) {
    console.log(form)

    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.cepsService.buscar(cep)
      .subscribe((dados: any) => this.populaForm(dados, form));
    }
    }

    populaForm(dados:any, formulario:any){
      formulario.form.patchValue({
        endereco: {
          logradouro: dados.logradouro,
          // cep: dados.cep,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });

    }

}

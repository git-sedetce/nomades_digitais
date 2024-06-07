import { Nomad } from './../models/nomad/nomad.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-nomad',
  templateUrl: './cadastro-nomad.component.html',
  styleUrls: ['./cadastro-nomad.component.css']
})
export class CadastroNomadComponent implements OnInit {

  @ViewChild("formNomad") formNomad!: NgForm
  nomad!: Nomad
  have_company!: any;

  submitted = false
  maxChars = 500
  qtdeChars = 255
  maxChars_link = 150


  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.nomad = new Nomad();
    this.getKnowHow();
  }

  verificaEmail(email:any, form: any){
    this.service.nomadByEmail(email).subscribe((res: any) => {
      //console.log('res', res)
      if(res.mensagem === 'Email já cadastrado!'){
        this.toastr.error(res.mensagem)
        this.nomad.nomad_email = '';
      } else {
        this.toastr.success(`Email disponível para cadastro`)
      }
    })
}

buscarCNPJ(cnpj:any, form: any){
  this.service.pegar_cnpj_nomad(cnpj).subscribe((res: any) => {
    //console.log('res', res)
    if(res.mensagem === 'CNPJ já cadastrado!'){
      this.toastr.error(res.mensagem)
      this.nomad.registro = '';
    } else {
      this.toastr.success(`CNPJ disponível para cadastro`)
    }
  })
}

  saveNomad(): void{
    this.nomad.know_how = this._knowhowList.filter(x=>x.isselected==true).map(x=>x.nome).join(",").toString()
    // console.log('nomad', this.nomad);
    this.service.cadastrar_nomad(this.nomad).subscribe({
      next: (res: any) => {
       // console.log(res);
        this.nomad.id = res.id
       // console.log("Id", this.nomad.id)
        this.submitted = true;
      },
      error: (e) => console.error(e)
    })

  }

  _knowhowList!: typeKnowHow[];

  getKnowHow(){
    this._knowhowList=[
      { nome:"Indicação", isselected: false },
      { nome:"Amigos", isselected: false },
      { nome:"Internet", isselected: false },
      { nome:"Grupos de Redes Sociais", isselected: false }
    ]
  }
/*
  saveNomad(): void {
    const data ={
      name: this.nomad.name,
      lastName: this.nomad.lastName,
      nomad_email: this.nomad.nomad_email,
      contato_nomad: this.nomad.contato_nomad,
      cidade: this.nomad.cidade,
      regiao: this.nomad.regiao,
      country: this.nomad.country,
      //departure_date: this.nomad.departure_date,
      shared_info: this.nomad.shared_info,
      nomads_news: this.nomad.nomads_news,
      suggestion: this.nomad.suggestion,

    }
    //console.log('dados enviados', data)
    this.service.cadastrar_nomad(data).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.nomad.id = res.id
        //console.log("Id", this.nomad.id)
        this.submitted = true;
      },
      error: (e) => console.error(e)
    })
  }*/

  novoCadastroNomad(){
    window.location.reload();
  }

}

class typeKnowHow{
  nome: string | undefined;
  isselected: boolean | undefined;
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConectComunidade } from 'src/app/models/comunidade/conect-comunidade.model';

@Component({
  selector: 'app-cadastro-midia',
  templateUrl: './cadastro-midia.component.html',
  styleUrls: ['./cadastro-midia.component.css']
})
export class CadastroMidiaComponent implements OnInit {

  @ViewChild("formConect") formConect!: NgForm

  conect!: ConectComunidade
  maxChars = 500
  qtdeChars = 255
  maxChars_link = 150

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.conect = new ConectComunidade();
  }

  saveConect(form?: NgForm){
    console.log(this.conect)
    this.toastr.success('Ponto de Encontro cadastrado com sucesso!')
    this.formConect.reset()
  }

}

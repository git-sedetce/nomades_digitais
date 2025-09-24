import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Comunidade } from 'src/app/models/comunidade/comunidade.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @ViewChild("formComunity") formNomad!: NgForm

  comunity!: Comunidade
  maxChars = 500
  qtdeChars = 255
  maxChars_link = 150

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.comunity = new Comunidade();
  }

  saveComunity(){
    console.log(this.comunity)
    this.toastr.success('Comunidade cadastrada com sucesso!')
    this.formNomad.reset()
  }

}

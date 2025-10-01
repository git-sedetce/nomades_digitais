import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comunidade } from 'src/app/models/comunidade/comunidade.model';
import { ComunidadeService } from 'src/app/services/comunidade.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  @ViewChild('formComunity') formNomad!: NgForm;

  comunity!: Comunidade;
  maxChars = 500;
  qtdeChars = 255;
  maxChars_link = 150;

  _languageList!: typeLanguage[];

  constructor(
    private toastr: ToastrService,
    private community: ComunidadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comunity = new Comunidade();
    this.getLanguage();
  }

  getLanguage() {
    this._languageList = [
      { nome: 'Alemão', isselected: false },
      { nome: 'Chinês', isselected: false },
      { nome: 'Espanhol', isselected: false },
      { nome: 'Francês', isselected: false },
      { nome: 'Inglês', isselected: false },
      { nome: 'Italiano', isselected: false },
      { nome: 'Japonês', isselected: false },
      { nome: 'Português', isselected: false },
    ];
  }

  saveComunity() {
    this.comunity.idioma = this._languageList
      .filter((x) => x.isselected == true)
      .map((x) => x.nome)
      .join(',')
      .toString();

    this.community.cadastrarComunidade(this.comunity).subscribe({
      next: (res: Comunidade) => {
        this.toastr.success('Comunidade cadastrada com sucesso!');
        this.router.navigate(['comunidade/homecadastro']);
      },
      error: (e) => this.toastr.error('Erro ao cadastrar comunidade: ' + e),
    });
  }
}

class typeLanguage {
  nome: string | undefined;
  isselected: boolean | undefined;
}

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
  maxChars = 255;
  qtdeChars = 255;
  maxChars_link = 150;

  constructor(
    private toastr: ToastrService,
    private community: ComunidadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comunity = new Comunidade();
  }

  saveComunity() {

    this.community.cadastrarComunidade(this.comunity).subscribe({
      next: (res: Comunidade) => {
        this.toastr.success('Comunidade cadastrada com sucesso!');
        this.router.navigate(['comunidade/homecadastro']);
      },
      error: (e) => this.toastr.error('Erro ao cadastrar comunidade: ' + e),
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConectComunidade } from 'src/app/models/comunidade/conect-comunidade.model';
import { ComunidadeService } from 'src/app/services/comunidade.service';

@Component({
  selector: 'app-cadastro-midia',
  templateUrl: './cadastro-midia.component.html',
  styleUrls: ['./cadastro-midia.component.css'],
})
export class CadastroMidiaComponent implements OnInit {
  @ViewChild('formConect') formConect!: NgForm;

  conect!: ConectComunidade;
  maxChars = 500;
  qtdeChars = 255;
  maxChars_link = 150;
  lista_comunidades!: any[];

  constructor(
    private toastr: ToastrService,
    private community: ComunidadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conect = new ConectComunidade();
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

  saveConect() {
    this.community.cadastrarMidia(this.conect).subscribe({
      next: (res: any) => {
        this.toastr.success(
          'Comunicação com a Comunidade cadastrada com sucesso!'
        );
        this.router.navigate(['comunidade/homecadastro']);
      },
      error: (e) => this.toastr.error('Erro ao cadastrar comunicação: ' + e),
    });
  }
}

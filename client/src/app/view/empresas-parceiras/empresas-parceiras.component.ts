import { Component, OnInit } from '@angular/core';
import { ParceriaService } from 'src/app/services/parceria.service';

@Component({
  selector: 'app-empresas-parceiras',
  templateUrl: './empresas-parceiras.component.html',
  styleUrls: ['./empresas-parceiras.component.css'],
})
export class EmpresasParceirasComponent implements OnInit {
  lista_parcerias!: any[];
  lista_bairro!: any[];
  lista_cidade!: any[];

  constructor(private service: ParceriaService) {}

  ngOnInit(): void {
    this.getParceiros();
    this.getBairro();
    this.getCidades();
  }

  getParceiros() {
    this.service.pegarParceiros('parceiro').subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  getBairro() {
    this.service.listarBairros('listaBairros').subscribe(
      (neighborhood: any[]) => {
        this.lista_bairro = neighborhood;
        // console.log('neighborhoods', this.lista_bairro);
      },
      (erro: any) => console.log(erro)
    );
  }

  getCidades() {
    this.service.listarCidades('listaCidades').subscribe(
      (city: any[]) => {
        this.lista_cidade = city;
        // console.log('citys', this.lista_cidade);
      },
      (erro: any) => console.log(erro)
    );
  }

  filtroBairro(bairro: any) {
    this.service.parceirosByMunicipio('parceiroByBairro/', bairro).subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        // console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  filtroCidade(cidade: any) {
    this.service.parceirosByMunicipio('parceiroByCidade/', cidade).subscribe(
      (partner: any[]) => {
        this.lista_parcerias = partner;
        // console.log('partners', this.lista_parcerias);
      },
      (erro: any) => console.log(erro)
    );
  }

  onView(parceirias: any) {}
}

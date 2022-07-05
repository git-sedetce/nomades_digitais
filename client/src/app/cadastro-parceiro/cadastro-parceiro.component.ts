import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {


  submitParceiro(parceiro:any){
    console.log(parceiro)
  }

  constructor() { }

  ngOnInit() {
  }

}

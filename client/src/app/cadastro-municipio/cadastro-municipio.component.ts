import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-municipio',
  templateUrl: './cadastro-municipio.component.html',
  styleUrls: ['./cadastro-municipio.component.css']
})
export class CadastroMunicipioComponent implements OnInit {

  submitCity(municipio:any){
    console.log(municipio)
  }

  constructor() { }

  ngOnInit(): void {
  }

}

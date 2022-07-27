import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-municipio',
  templateUrl: './cadastro-municipio.component.html',
  styleUrls: ['./cadastro-municipio.component.css']
})
export class CadastroMunicipioComponent implements OnInit {

  service_wifi: any;
  rota_turistica: any;

  submitCity(municipio:any){
    console.log(municipio)
  }


  constructor() { }

  ngOnInit(): void {

    /*this.services.httpGet('status-filter')
      .subscribe((s: any[]) => {
        if (loggar) console.log('status-filter', s);
        this.status_filter = s;
      }, erro => console.log(erro)
      );*/
  }



}

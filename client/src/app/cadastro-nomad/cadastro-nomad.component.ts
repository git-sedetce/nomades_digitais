import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-cadastro-nomad',
  templateUrl: './cadastro-nomad.component.html',
  styleUrls: ['./cadastro-nomad.component.css']
})
export class CadastroNomadComponent implements OnInit {

  nomad = {
    id: '',
    name: '',
    lastName: '',
    nomad_email: '',
    contato_nomad: '',
    cidade: '',
    regiao: '',
    country: '',
    departure_date: '',
    shared_info: '',
    nomads_news: '',
    suggestion: '',
  }

  submitted = false
  maxChars = 500
  qtdeChars = 255
  maxChars_link = 150

  submitNomads(nomads:any){
    console.log(nomads)
    //console.log(this.empresa)
  }

  constructor(public service: ServiceService) { }

  ngOnInit() {
  }

  saveNomad(): void {
    const data ={
      name: this.nomad.name,
      lastName: this.nomad.lastName,
      nomad_email: this.nomad.nomad_email,
      contato_nomad: this.nomad.contato_nomad,
      cidade: this.nomad.cidade,
      regiao: this.nomad.regiao,
      country: this.nomad.country,
      departure_date: this.nomad.departure_date,
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
  }

  novoCadastroNomad(){
    window.location.reload();
  }

}

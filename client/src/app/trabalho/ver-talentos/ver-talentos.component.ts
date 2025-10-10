import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-ver-talentos',
  templateUrl: './ver-talentos.component.html',
  styleUrls: ['./ver-talentos.component.css']
})
export class VerTalentosComponent implements OnInit {
  lista_nomad!: any[];
  has_nomads: boolean = false;

  constructor(
    public nomadService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getNomad();
  }

  getNomad() {
    this.nomadService.listar_nomads('nomadsAll').subscribe(
      (nd: any) => {
        this.lista_nomad = nd;
        this.has_nomads = this.lista_nomad.length > 0;
        console.log('nomad', this.lista_nomad);
      },
      (erro: any) => console.error(erro)
    );
  }

}

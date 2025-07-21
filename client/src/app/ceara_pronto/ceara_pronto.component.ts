import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from '../service/listarmunicipio/lista-minucipio.service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-ceara_pronto',
  templateUrl: './ceara_pronto.component.html',
  styleUrls: ['./ceara_pronto.component.css'],
})
export class Ceara_prontoComponent implements OnInit {
  lista_municipio!: any[];
  lista_municipio_ibge!: any[];
  munInfo!: any;
  municipioCadastrado!: any;
  showInfo: boolean = false;
  showCeara: boolean = true;

  constructor(
    public services: ListaMinucipioService,
    private cityService: ServiceService) {}

  ngOnInit() {
    this.services.listar_municipio('dados_municipio').subscribe(
      (m: any[]) => {
        // console.log('lista_municipio', m);
        this.lista_municipio = m;
      },
      (erro: any) => console.log(erro)
    );
  }

  onMapClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const id = target.id;
  if (id) {
    this.munInfo = this.lista_municipio.find((m) => String(m.id) === id);
    console.log('Municipio Info:', this.munInfo);
    this.pegarCidade(this.munInfo.nome_municipio, this.munInfo.cod_ibge);
  }
}

pegarCidade(cidade: string, ibge: any) {
  this.cityService.getDataCity(cidade).subscribe(
      (data: any) => {
        if(data && Object.keys(data).length > 0) {
          this.municipioCadastrado = data;
          console.log('Municipio Data:', this.municipioCadastrado);
          this.showInfo = true;
          this.showCeara = false;
        }else{
          this.cityService.consultaIBGE(ibge).subscribe(
            (ibgeData: any) => {
              this.lista_municipio_ibge = ibgeData;
              console.log('IBGE Data:', this.lista_municipio_ibge);
            }
          )
          this.showInfo = false;
          this.showCeara = false;
        }
      },
      (error: any) => console.error('Error fetching city data:', error)
    );

}

}

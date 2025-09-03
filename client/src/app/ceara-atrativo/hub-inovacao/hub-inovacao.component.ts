import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub-inovacao',
  templateUrl: './hub-inovacao.component.html',
  styleUrls: ['./hub-inovacao.component.css']
})
export class HubInovacaoComponent implements OnInit {

  viewHome: boolean = true;
  viewIncubadoras: boolean = false;
  viewAceleradoras: boolean = false;
  viewParquesTecnologicos: boolean = false;

  ngOnInit(): void {

  }

  verIncubadora():void {
    this.viewHome = false;
    this.viewIncubadoras = true;
    this.viewAceleradoras = false;
    this.viewParquesTecnologicos = false;
  }

  verAceleradora():void {
    this.viewHome = false;
    this.viewIncubadoras = false;
    this.viewAceleradoras = true;
    this.viewParquesTecnologicos = false;
  }

  verParque():void {
    this.viewHome = false;
    this.viewIncubadoras = false;
    this.viewAceleradoras = false;
    this.viewParquesTecnologicos = true;
  }

  return():void {
    this.viewHome = true;
    this.viewIncubadoras = false;
    this.viewAceleradoras = false;
    this.viewParquesTecnologicos = false;
  }

}

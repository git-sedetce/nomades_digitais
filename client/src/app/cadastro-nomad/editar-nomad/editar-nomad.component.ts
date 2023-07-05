import { Nomad } from './../../models/nomad/nomad.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-editar-nomad',
  templateUrl: './editar-nomad.component.html',
  styleUrls: ['./editar-nomad.component.css']
})
export class EditarNomadComponent implements OnInit {

  @ViewChild("formNomad") formNomad!: NgForm
  nomad!: Nomad

  submitted = false
  maxChars = 500
  qtdeChars = 255
  maxChars_link = 150

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('nomads.id')
    console.log('Id', id)
    this.service.nomadById(parseInt(id!)).subscribe((nomad) =>{
      this.nomad = nomad
      console.log('nomad', nomad)
    });
    //console.log('Id', res)
   /* if(res !== undefined)
      this.nomad = res;
    else
    throw new Error ("Nomad não encontrada: id = "+id)*/
  }

  updateNomad(): void {
    /*this.service.editar(this.nomad).subscribe(() => {
      this.router.navigate([])
    })*/

    //console.log('dados enviados', data)
    this.service.editar(this.nomad).subscribe({
      next: (res: any) => {
        console.log(res);
        this.nomad.id = res.id
        console.log("Id", this.nomad.id)
        this.submitted = true;
      },
      error: (e) => console.error(e)
    })
  }

  novoCadastroNomad(){
    window.location.reload();
  }

}

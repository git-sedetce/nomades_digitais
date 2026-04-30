import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/models/experience/experience.model';
import { ListaMinucipioService } from 'src/app/service/listarmunicipio/lista-minucipio.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-criar-experience',
  templateUrl: './criar-experience.component.html',
  styleUrls: ['./criar-experience.component.css']
})
export class CriarExperienceComponent implements OnInit {
  @ViewChild('formExperience') formExperience!: NgForm;
  @ViewChild('anexoImagem') anexoImagem!: ElementRef;
  experience!: Experience;
  profile_id!: any;
  user_id!: any;
  user_email!:any;
  token!: any;
  lista_cidades!: any[];
  lista_tipo_experience!: any[];
  arquivoImagemInvalido = false;
  nomeArquivoSelecionado: string | null = null;

  constructor(
    private estadoService: ListaMinucipioService,
    private experienceService: ExperienceService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.experience = new Experience();
    this.getPerfil();
    this.pegarCidade();
    this.tipo_experience();
  }

  getPerfil(){
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.user_email = payload._user_email;
    this.user_id = payload._user_id;
    console.log('Profile ID:', this.profile_id);
    console.log('Email:', this.user_email);
    console.log('User ID:', this.user_id);
  }

  pegarCidade() {
    this.estadoService.listar_municipio('todos_municipio').subscribe(
      (data: any) => {
        this.lista_cidades = data;
        // console.log('Cidades:', this.lista_cidades);
      },
      (erro: any) => console.error(erro)
    );
  }

  tipo_experience() {
    this.experienceService.listar_tipo_experiences('tipoexperiences').subscribe(
      (data: any) => {
        this.lista_tipo_experience = data;
        // console.log('Tipos de Experiências:', this.lista_tipo_experience);
      },
      (erro: any) => console.error(erro)
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nomeArquivoSelecionado = file.name;
      this.arquivoImagemInvalido = false;
    }
  }

  cadastrarExperience() {

    console.log('Experience a ser cadastrada:', this.experience);
    const imageFile = this.anexoImagem.nativeElement.files[0];

    if (!imageFile) {
      this.arquivoImagemInvalido = true;
      return;
    }

    const formData = new FormData();

    formData.append('dados', JSON.stringify(this.experience));
    formData.append('image', imageFile);

    this.http
      .post(environment.url + 'registerexperience', formData)
      .subscribe({
        next: () => {
          this.toastr.success('Cadastro realizado com sucesso!');
          this.formExperience.reset();
          this.router.navigate(['/experience/home']);
        },
        error: (e) => this.toastr.error(e.error.message),
      });
  }

}

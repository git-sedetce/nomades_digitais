import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-cadastrar-experience',
  templateUrl: './cadastrar-experience.component.html',
  styleUrls: ['./cadastrar-experience.component.css'],
})
export class CadastrarExperienceComponent implements OnInit {
  experience!: any;

  profile_id!: any;
  user_id!: any;
  user_email!: any;
  loadingCadastro = false;

  usuarioJaCadastrado = false;
  participantes: any[] = [];
  admExperience = false;

  vagasRestantes = 0;

  constructor(
    private route: ActivatedRoute, // ⬅️ adicionado
    private router: Router,
    private experienceService: ExperienceService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.pegarExperience(id);
      }
    });

    this.getPerfil();
  }

  getPerfil() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    this.profile_id = payload._profile_id;
    this.user_email = payload._user_email;
    this.user_id = payload._id;
  }

  pegarExperience(id: any) {
    this.experienceService.getExperienceById(id).subscribe(
      (data: any) => {
        this.experience = Array.isArray(data) ? data[0] : data;

        console.log('Experience:', this.experience);

        this.verificaAdm();

        // verifica participantes
        this.verificarInscitos(id);
      },
      (erro: any) => {
        console.error(erro);
      },
    );
  }

  verificarInscitos(id: any) {
    this.experienceService.verificaParticipantes(id).subscribe(
      (data: any) => {
        this.participantes = Array.isArray(data) ? data : [data];

        this.participantes = this.participantes.map((p: any) => ({
          ...p,
          confirmacao_presenca: p.confirmacao_presenca ?? false,
          ciente_pagamento: p.ciente_pagamento ?? false,
        }));

        console.log('Participantes:', this.participantes);

        // VERIFICA SE O USUÁRIO LOGADO ESTÁ INSCRITO
        this.usuarioJaCadastrado = this.participantes.some(
          (participante: any) => participante.user_id === this.user_id,
        );

        // CALCULA VAGAS RESTANTES
        this.vagasRestantes =
          this.experience.qtde_vagas - this.participantes.length;

        // console.log('Usuário já inscrito:', this.usuarioJaCadastrado);
      },
      (erro: any) => {
        console.error(erro);
      },
    );
  }

  verificaAdm() {
    if (this.experience.user_id === this.user_id) {
      this.admExperience = true;
    } else {
      this.admExperience = false;
    }
  }

  verificarCadastro() {
    if (!this.experience?.usuarios_cadastrados) {
      this.usuarioJaCadastrado = false;
      return;
    }

    this.usuarioJaCadastrado = this.experience.usuarios_cadastrados.some(
      (usuario: any) => usuario.user_id === this.user_id,
    );
  }

  cadastrarUsuario() {
    if (!this.user_id || !this.experience?.id) {
      alert('Dados inválidos.');
      return;
    }

    this.loadingCadastro = true;

    const data = {
      user_id: this.user_id,
      experience_id: this.experience.id,
    };

    // console.log('Dados enviados:', data);

    this.experienceService.cadastrarExperience(data).subscribe(
      (response: any) => {
        // console.log('Cadastro realizado:', response);

        this.usuarioJaCadastrado = true;

        alert('Você foi cadastrado na experiência com sucesso!');

        this.loadingCadastro = false;
      },
      (erro: any) => {
        console.error('Erro ao cadastrar:', erro);

        alert('Erro ao cadastrar na experiência.');

        this.loadingCadastro = false;
      },
    );
  }

  verParticipantes() {
    this.router.navigate(['/experience/paritipantes']);
  }

  finalizarExperience() {
    const confirmar = confirm('Deseja realmente finalizar esta experience?');

    if (!confirmar) {
      return;
    }

    const data = {
      id: this.experience.id,
      status: true,
    };

    this.experienceService.finalizarExperience(data).subscribe(
      (response: any) => {
        console.log('Experience finalizada:', response);

        alert('Experience finalizada com sucesso!');

        this.router.navigate(['/experience/home']);
      },
      (erro: any) => {
        console.error(erro);

        alert('Erro ao finalizar experience.');
      },
    );
  }
}

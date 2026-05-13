import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-ver-participantes',
  templateUrl: './ver-participantes.component.html',
  styleUrls: ['./ver-participantes.component.css'],
})
export class VerParticipantesComponent implements OnInit {
  profile_id!: any;
  user_id!: any;
  user_email!: any;

  participantes: any[] = [];
  atualizandoId: number | null = null;

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
    this.experienceService.getParticipanteExperienceById(id).subscribe(
      (data: any) => {
        this.participantes = Array.isArray(data) ? data : [data];

        this.participantes = this.participantes.map((p: any) => ({
          ...p,
          confirmacao_presenca: p.confirmacao_presenca ?? false,
          ciente_pagamento: p.ciente_pagamento ?? false,
        }));

        console.log('Participantes:', this.participantes);
      },
      (erro: any) => {
        console.error(erro);
      },
    );
  }

  atualizarParticipante(participante: any) {
    if (!participante || !participante.id) {
      return;
    }

    const payload = {
      confirmacao_presenca: participante.confirmacao_presenca,
      ciente_pagamento: participante.ciente_pagamento,
    };

    this.atualizandoId = participante.id;
    this.experienceService
      .updateParticipanteExperience(participante.id, payload)
      .subscribe(
        (updated: any) => {
          this.atualizandoId = null;
          console.log('Participante atualizado:', updated);
        },
        (erro: any) => {
          this.atualizandoId = null;
          console.error('Erro ao atualizar participante:', erro);
        },
      );
  }

  removerParticipante(participante: any) {
    if (!participante?.id) {
      return;
    }

    const confirmar = confirm(
      `Deseja remover o participante ${
        participante.ass_cadastro_user?.nome_completo || ''
      } da experience?`,
    );

    if (!confirmar) {
      return;
    }

    this.experienceService
      .deleteParticipanteExperience(participante.id)
      .subscribe(
        () => {
          this.participantes = this.participantes.filter(
            (p) => p.id !== participante.id,
          );

          console.log('Participante removido com sucesso');
        },
        (erro: any) => {
          console.error('Erro ao remover participante:', erro);
        },
      );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Nomad } from 'src/app/models/nomad/nomad.model';
import { VagaEmprego } from 'src/app/models/trabalho/vaga-emprego.model';
import { TrabalhoService } from 'src/app/services/trabalho.service';
declare var bootstrap: any; // importante para usar o modal

@Component({
  selector: 'app-cadastra-vaga',
  templateUrl: './cadastra-vaga.component.html',
  styleUrls: ['./cadastra-vaga.component.css'],
})
export class CadastraVagaComponent implements OnInit {
  @ViewChild('vagaForm') vagaForm!: NgForm;
  @ViewChild('contatoForm') contatoForm!: NgForm;

  vaga!: VagaEmprego;
  listaVagas!: any[];
  has_opportunity: boolean = false;
  has_logon: boolean = false;
  editando = false;
  vagaEditandoId: number | null = null;

  authenticated = false;
  profile: any;
  company_id: any;

  contato = { mensagem: '', telefone: '', email: '', vaga_id: '', nomeVaga: '', nomad_id: '', mail_company: '', nomad_name: '' };
  modalContato: any;
  vagaSelecionada: any;

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  constructor(
    private serviceJobs: TrabalhoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.vaga = new VagaEmprego();
    this.getPerfil();
    this.oportunidades(this.has_logon);
  }

  getPerfil() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
      const loginUsers: any = JSON.parse(atob(token!.split('.')[1]));
      this.profile = loginUsers._profile_id;
      this.company_id = loginUsers._id;
      if (this.profile === 2) {
        this.has_logon = true;
      } else {
        this.has_logon = false;
      }
      if (this.profile === 1) {
        this.contato.nomad_id = loginUsers._id;
        this.contato.nomad_name = loginUsers._user_name;
      }
    }
  }

  cadastrarOuAtualizarVaga() {
    if (!this.vaga.nome_vaga || !this.vaga.descricao || !this.vaga.status) {
      this.toastr.warning('Preencha todos os campos antes de cadastrar!');
      return;
    }

    this.vaga.parceiro_id = this.company_id; // ID fixo (futuramente virá do login)

    // Se está editando, atualizar a vaga
    if (this.editando && this.vagaEditandoId) {
      this.serviceJobs.atualizarVaga(this.vaga, this.vagaEditandoId).subscribe({
        next: () => {
          this.toastr.success('Vaga atualizada com sucesso!');
          this.cancelarEdicao();
          this.oportunidades(this.has_logon);
        },
        error: (e) => this.toastr.error('Erro ao atualizar vaga: ' + e),
      });
    } else {
      // Novo cadastro
      this.serviceJobs.cadastrarvaga(this.vaga).subscribe({
        next: () => {
          this.toastr.success('Oportunidade cadastrada com sucesso!');
          this.vagaForm.resetForm();
          this.vaga = new VagaEmprego();
          this.oportunidades(this.has_logon);
        },
        error: (e) => this.toastr.error('Erro ao cadastrar vaga: ' + e),
      });
    }
  }

  editarVaga(vaga: any) {
    this.editando = true;
    this.vagaEditandoId = vaga.id;
    this.vaga = { ...vaga };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluirVaga(id: number) {
    if (confirm('Deseja realmente excluir esta vaga?')) {
      this.serviceJobs.deleteVaga(id).subscribe({
        next: () => {
          this.toastr.success('Vaga excluída com sucesso!');
          this.oportunidades(this.has_logon);
        },
        error: (e) => this.toastr.error('Erro ao excluir vaga: ' + e),
      });
    }
  }

  cancelarEdicao() {
    this.editando = false;
    this.vagaEditandoId = null;
    this.vaga = new VagaEmprego();
    this.vagaForm.resetForm();
  }

  oportunidades(verVagas: boolean) {
    if (verVagas) {
      this.serviceJobs.getVagaByCompanyId(this.company_id).subscribe(
        (vagas: any[]) => {
          this.listaVagas = vagas;
          if (this.listaVagas.length > 0) {
            this.has_opportunity = true;
          }
        },
        (erro: any) => console.error(erro)
      );
    } else {
      this.serviceJobs.getVaga('pegarvagas').subscribe(
        (vagas: any[]) => {
          this.listaVagas = vagas;
          if (this.listaVagas.length > 0) {
            this.has_opportunity = true;
          }
        },
        (erro: any) => console.error(erro)
      );
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Vaga Aplicada':
        return 'bg-secondary';
      case 'Análise de Currículo':
        return 'bg-info';
      case 'Entrevista':
        return 'bg-warning text-dark';
      case 'Proposta':
        return 'bg-success';
      case 'Encerrado':
        return 'bg-danger';
      default:
        return 'bg-light text-dark';
    }
  }

  abrirModalContato(vaga: any) {
    this.vagaSelecionada = vaga;
    this.contato.vaga_id = vaga.id;
    this.contato.nomeVaga = vaga.nome_vaga; // Pegando o nome da vaga
    this.contato.mail_company = vaga.ass_vagas_parceiro.email_parceiro; // Pegando o email da empresa
    const modalEl = document.getElementById('modalContato');
    this.modalContato = new bootstrap.Modal(modalEl);
    this.modalContato.show();
  }

  enviarContato() {
    this.serviceJobs.interessevaga(this.contato).subscribe({
      next: () => {
        this.toastr.success('Contato enviado com sucesso!');
        this.contatoForm.resetForm();
        this.modalContato.hide();
      },
      error: (e) => this.toastr.error('Erro ao enviar contato: ' + e),
    });
  }

  onHover(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.style.filter = 'brightness(1.05) saturate(1.1)';
    img.style.transform = 'scale(1.05)';
    img.style.boxShadow = '0 0 15px rgba(0,0,0,0.3)';
  }

  onLeave(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.style.filter = 'brightness(0.9) saturate(1)';
    img.style.transform = 'scale(1)';
    img.style.boxShadow = 'none';
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VagaEmprego } from 'src/app/models/trabalho/vaga-emprego.model';
import { TrabalhoService } from 'src/app/services/trabalho.service';

@Component({
  selector: 'app-cadastra-vaga',
  templateUrl: './cadastra-vaga.component.html',
  styleUrls: ['./cadastra-vaga.component.css']
})
export class CadastraVagaComponent implements OnInit {
  @ViewChild('vagaForm') vagaForm!: NgForm;
  vaga!: VagaEmprego;
  listaVagas!: any[];
  has_opportunity: boolean = false;
  editando = false;
  vagaEditandoId: number | null = null;

  constructor(
    private serviceJobs: TrabalhoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.vaga = new VagaEmprego();
    this.oportunidades();
  }

  cadastrarOuAtualizarVaga() {
    if (!this.vaga.nome_vaga || !this.vaga.descricao || !this.vaga.status) {
      this.toastr.warning('Preencha todos os campos antes de cadastrar!');
      return;
    }

    this.vaga.parceiro_id = 3; // ID fixo (futuramente virá do login)

    // Se está editando, atualizar a vaga
    if (this.editando && this.vagaEditandoId) {
      this.serviceJobs.atualizarVaga(this.vaga, this.vagaEditandoId).subscribe({
        next: () => {
          this.toastr.success('Vaga atualizada com sucesso!');
          this.cancelarEdicao();
          this.oportunidades();
        },
        error: (e) => this.toastr.error('Erro ao atualizar vaga: ' + e)
      });
    } else {
      // Novo cadastro
      this.serviceJobs.cadastrarvaga(this.vaga).subscribe({
        next: () => {
          this.toastr.success('Oportunidade cadastrada com sucesso!');
          this.vagaForm.resetForm();
          this.vaga = new VagaEmprego();
          this.oportunidades();
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
          this.oportunidades();
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

  oportunidades(){
    this.serviceJobs.getVaga('pegarvagas').subscribe(
      (vagas: any[]) => {
        this.listaVagas = vagas;
        if(this.listaVagas.length > 0){
          this.has_opportunity = true;
        }
        // console.log(this.listaVagas);
      },
      (erro: any) => console.error(erro)
    );
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Vaga Aplicada': return 'bg-secondary';
      case 'Análise de Currículo': return 'bg-info';
      case 'Entrevista': return 'bg-warning text-dark';
      case 'Proposta': return 'bg-success';
      case 'Encerrado': return 'bg-danger';
      default: return 'bg-light text-dark';
    }
  }


}

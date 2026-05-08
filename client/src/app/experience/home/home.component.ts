import { Component, OnInit } from '@angular/core';
import { ListaMinucipioService } from 'src/app/service/listarmunicipio/lista-minucipio.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 8;

  profile_id!: any;
  user_id!: any;
  user_email!: any;

  lista_experiences: any[] = [];

  filtroCidade: string = '';
  filtroRegiao: string = '';
  filtroTipo: string = '';
  filtroData: string = '';

  lista_experiences_original: any[] = [];

  // dropdowns
  tipos: string[] = [];
  regioes: string[] = [];

  // autocomplete
  cidades: string[] = [];
  cidadesFiltradas: string[] = [];
  mostrarSugestoes: boolean = false;

  constructor(
    private experienceService: ExperienceService,
    private estadoService: ListaMinucipioService,
  ) {}

  ngOnInit(): void {
    this.getPerfil();
    this.pegarExperience();
  }

  getPerfil() {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.user_email = payload._user_email;
    this.user_id = payload._id;
  }

  pegarExperience() {
    this.experienceService.listar_experiences('experiences').subscribe(
      (data: any) => {
        // 🔥 NORMALIZAÇÃO DOS DADOS
        this.lista_experiences = data.map((exp: any) => ({
          id: exp.id,
          title: exp.titulo,
          tipo: exp.ass_experience_type?.tipo_experience || 'Não informado',

          location: exp.ass_experience_type?.local || 'Não informado',
          data: exp.data_experience,
          price: `R$ ${exp.valor}`,

          status: exp.ass_experience_type?.status || 'Não informado',
          usuario_id: exp.user_id,

          cidade: exp.ass_experiences_cidade?.nome_municipio || 'Não informado',
          regiao:
            exp.ass_experiences_cidade.ass_municipio_regiao?.nome ||
            'Não informado',

          image:
            exp.ass_experience_anexos?.[0]?.base64 ||
            exp.ass_experience_anexos?.[0]?.path ||
            'assets/no-image.jpg',
        }));
        this.lista_experiences_original = this.lista_experiences;
        // 🎯 TIPOS únicos
        this.tipos = [...new Set(this.lista_experiences.map((e) => e.tipo))];

        // 🌎 REGIÕES únicas
        this.regioes = [
          ...new Set(this.lista_experiences.map((e) => e.regiao)),
        ];

        // 🏙️ CIDADES únicas
        this.cidades = [
          ...new Set(this.lista_experiences.map((e) => e.cidade)),
        ];

        console.log('Experiences:', this.lista_experiences);
      },
      (erro: any) => console.error(erro),
    );
  }

  filtrarCidades() {
    const termo = this.filtroCidade.toLowerCase();

    this.cidadesFiltradas = this.cidades.filter((c) =>
      c.toLowerCase().includes(termo),
    );

    this.mostrarSugestoes = true;
  }

  selecionarCidade(cidade: string) {
    this.filtroCidade = cidade;
    this.mostrarSugestoes = false;
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    this.currentPage = 1;

    this.lista_experiences = this.lista_experiences_original.filter((exp) => {
      const cidadeMatch = this.filtroCidade
        ? exp.cidade.toLowerCase().includes(this.filtroCidade.toLowerCase())
        : true;

      const regiaoMatch = this.filtroRegiao
        ? exp.regiao === this.filtroRegiao
        : true;

      const tipoMatch = this.filtroTipo ? exp.tipo === this.filtroTipo : true;

      const dataMatch = this.filtroData
        ? exp.data?.includes(this.filtroData)
        : true;

      return cidadeMatch && regiaoMatch && tipoMatch && dataMatch;
    });
  }

  limparFiltros() {
    this.filtroCidade = '';
    this.filtroRegiao = '';
    this.filtroTipo = '';
    this.filtroData = '';

    this.lista_experiences = this.lista_experiences_original;
    this.currentPage = 1;

    this.mostrarSugestoes = false;
  }

  // 🔥 AGORA USA lista_experiences
  get paginatedExperiences() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.lista_experiences.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.lista_experiences.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  participar(item: any) {
    console.log('Participar da experience:', item);

    // exemplo:
    // this.experienceService.participar(item.id).subscribe(...)
  }

  verInscritos(item: any) {
    console.log('Ver inscritos da experience:', item);

    // exemplo:
    // this.router.navigate(['/experience', item.id, 'inscritos']);
  }
}

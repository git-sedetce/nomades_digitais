import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentPage = 1;
  itemsPerPage = 4;

   experiences = [
    {
      title: 'Passeio de barco ao pôr do sol',
      location: 'Fortaleza, Ceará',
      price: 'A partir de R$120',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Trilha ecológica guiada',
      location: 'Guaramiranga, Ceará',
      price: 'A partir de R$85',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Aula de culinária regional',
      location: 'Sobral, Ceará',
      price: 'A partir de R$95',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Passeio de buggy nas dunas',
      location: 'Jericoacoara, Ceará',
      price: 'A partir de R$180',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80'
    }
  ];

  get paginatedExperiences() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.experiences.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.experiences.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}

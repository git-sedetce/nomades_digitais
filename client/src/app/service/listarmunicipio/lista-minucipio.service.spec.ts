import { TestBed } from '@angular/core/testing';

import { ListaMinucipioService } from './lista-minucipio.service';

describe('ListaMinucipioService', () => {
  let service: ListaMinucipioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaMinucipioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

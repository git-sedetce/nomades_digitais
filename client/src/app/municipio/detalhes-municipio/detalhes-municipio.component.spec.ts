import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesMunicipioComponent } from './detalhes-municipio.component';

describe('DetalhesMunicipioComponent', () => {
  let component: DetalhesMunicipioComponent;
  let fixture: ComponentFixture<DetalhesMunicipioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesMunicipioComponent]
    });
    fixture = TestBed.createComponent(DetalhesMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

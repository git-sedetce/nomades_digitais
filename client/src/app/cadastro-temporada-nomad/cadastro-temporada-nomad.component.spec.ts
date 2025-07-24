import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTemporadaNomadComponent } from './cadastro-temporada-nomad.component';

describe('CadastroTemporadaNomadComponent', () => {
  let component: CadastroTemporadaNomadComponent;
  let fixture: ComponentFixture<CadastroTemporadaNomadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroTemporadaNomadComponent]
    });
    fixture = TestBed.createComponent(CadastroTemporadaNomadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

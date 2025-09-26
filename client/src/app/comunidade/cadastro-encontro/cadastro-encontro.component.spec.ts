import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEncontroComponent } from './cadastro-encontro.component';

describe('CadastroEncontroComponent', () => {
  let component: CadastroEncontroComponent;
  let fixture: ComponentFixture<CadastroEncontroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroEncontroComponent]
    });
    fixture = TestBed.createComponent(CadastroEncontroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

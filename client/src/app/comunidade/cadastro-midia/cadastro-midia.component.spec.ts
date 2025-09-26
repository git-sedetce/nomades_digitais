import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMidiaComponent } from './cadastro-midia.component';

describe('CadastroMidiaComponent', () => {
  let component: CadastroMidiaComponent;
  let fixture: ComponentFixture<CadastroMidiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroMidiaComponent]
    });
    fixture = TestBed.createComponent(CadastroMidiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarExperienceComponent } from './cadastrar-experience.component';

describe('CadastrarExperienceComponent', () => {
  let component: CadastrarExperienceComponent;
  let fixture: ComponentFixture<CadastrarExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarExperienceComponent]
    });
    fixture = TestBed.createComponent(CadastrarExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

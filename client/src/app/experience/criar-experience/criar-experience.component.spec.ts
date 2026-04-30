import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarExperienceComponent } from './criar-experience.component';

describe('CriarExperienceComponent', () => {
  let component: CriarExperienceComponent;
  let fixture: ComponentFixture<CriarExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarExperienceComponent]
    });
    fixture = TestBed.createComponent(CriarExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

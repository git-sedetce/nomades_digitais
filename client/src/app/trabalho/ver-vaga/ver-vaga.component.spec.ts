import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVagaComponent } from './ver-vaga.component';

describe('VerVagaComponent', () => {
  let component: VerVagaComponent;
  let fixture: ComponentFixture<VerVagaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerVagaComponent]
    });
    fixture = TestBed.createComponent(VerVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

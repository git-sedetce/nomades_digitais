import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfEstrangeiroComponent } from './cpf-estrangeiro.component';

describe('CpfEstrangeiroComponent', () => {
  let component: CpfEstrangeiroComponent;
  let fixture: ComponentFixture<CpfEstrangeiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpfEstrangeiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpfEstrangeiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

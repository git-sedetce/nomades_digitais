import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedagemComponent } from './hospedagem.component';

describe('HospedagemComponent', () => {
  let component: HospedagemComponent;
  let fixture: ComponentFixture<HospedagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospedagemComponent]
    });
    fixture = TestBed.createComponent(HospedagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

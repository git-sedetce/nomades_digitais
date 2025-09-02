import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubInovacaoComponent } from './hub-inovacao.component';

describe('HubInovacaoComponent', () => {
  let component: HubInovacaoComponent;
  let fixture: ComponentFixture<HubInovacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HubInovacaoComponent]
    });
    fixture = TestBed.createComponent(HubInovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

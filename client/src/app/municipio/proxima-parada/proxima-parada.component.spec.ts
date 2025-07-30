import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximaParadaComponent } from './proxima-parada.component';

describe('ProximaParadaComponent', () => {
  let component: ProximaParadaComponent;
  let fixture: ComponentFixture<ProximaParadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximaParadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximaParadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

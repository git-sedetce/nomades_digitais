import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaNomadComponent } from './temporada-nomad.component';

describe('TemporadaNomadComponent', () => {
  let component: TemporadaNomadComponent;
  let fixture: ComponentFixture<TemporadaNomadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadaNomadComponent]
    });
    fixture = TestBed.createComponent(TemporadaNomadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

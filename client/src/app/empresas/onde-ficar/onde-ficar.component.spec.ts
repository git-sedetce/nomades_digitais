import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndeFicarComponent } from './onde-ficar.component';

describe('OndeFicarComponent', () => {
  let component: OndeFicarComponent;
  let fixture: ComponentFixture<OndeFicarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OndeFicarComponent]
    });
    fixture = TestBed.createComponent(OndeFicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

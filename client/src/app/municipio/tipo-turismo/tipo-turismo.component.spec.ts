import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTurismoComponent } from './tipo-turismo.component';

describe('TipoTurismoComponent', () => {
  let component: TipoTurismoComponent;
  let fixture: ComponentFixture<TipoTurismoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoTurismoComponent]
    });
    fixture = TestBed.createComponent(TipoTurismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

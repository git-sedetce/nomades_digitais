import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEstadoComponent } from './perfil-estado.component';

describe('PerfilEstadoComponent', () => {
  let component: PerfilEstadoComponent;
  let fixture: ComponentFixture<PerfilEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilEstadoComponent]
    });
    fixture = TestBed.createComponent(PerfilEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

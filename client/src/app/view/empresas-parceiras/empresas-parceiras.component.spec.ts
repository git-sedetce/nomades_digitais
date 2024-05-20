import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasParceirasComponent } from './empresas-parceiras.component';

describe('EmpresasParceirasComponent', () => {
  let component: EmpresasParceirasComponent;
  let fixture: ComponentFixture<EmpresasParceirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasParceirasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasParceirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

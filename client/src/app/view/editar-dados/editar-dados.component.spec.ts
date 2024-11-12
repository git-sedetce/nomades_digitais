import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDadosComponent } from './editar-dados.component';

describe('EditarDadosComponent', () => {
  let component: EditarDadosComponent;
  let fixture: ComponentFixture<EditarDadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarDadosComponent]
    });
    fixture = TestBed.createComponent(EditarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

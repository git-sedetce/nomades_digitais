import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNomadComponent } from './editar-nomad.component';

describe('EditarNomadComponent', () => {
  let component: EditarNomadComponent;
  let fixture: ComponentFixture<EditarNomadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarNomadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNomadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

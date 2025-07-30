import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNomadsComponent } from './editar-nomads.component';

describe('EditarNomadsComponent', () => {
  let component: EditarNomadsComponent;
  let fixture: ComponentFixture<EditarNomadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarNomadsComponent]
    });
    fixture = TestBed.createComponent(EditarNomadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

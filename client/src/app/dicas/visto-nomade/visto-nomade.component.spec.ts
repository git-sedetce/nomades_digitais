import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistoNomadeComponent } from './visto-nomade.component';

describe('VistoNomadeComponent', () => {
  let component: VistoNomadeComponent;
  let fixture: ComponentFixture<VistoNomadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistoNomadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistoNomadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

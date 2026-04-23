import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConhecaCearaComponent } from './conheca-ceara.component';

describe('ConhecaCearaComponent', () => {
  let component: ConhecaCearaComponent;
  let fixture: ComponentFixture<ConhecaCearaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConhecaCearaComponent]
    });
    fixture = TestBed.createComponent(ConhecaCearaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

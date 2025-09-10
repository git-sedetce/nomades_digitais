import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEnvironmentComponent } from './work-environment.component';

describe('WorkEnvironmentComponent', () => {
  let component: WorkEnvironmentComponent;
  let fixture: ComponentFixture<WorkEnvironmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkEnvironmentComponent]
    });
    fixture = TestBed.createComponent(WorkEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

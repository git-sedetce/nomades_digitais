import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTalentosComponent } from './ver-talentos.component';

describe('VerTalentosComponent', () => {
  let component: VerTalentosComponent;
  let fixture: ComponentFixture<VerTalentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerTalentosComponent]
    });
    fixture = TestBed.createComponent(VerTalentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

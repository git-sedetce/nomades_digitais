/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeloComponent } from './selo.component';

describe('SeloComponent', () => {
  let component: SeloComponent;
  let fixture: ComponentFixture<SeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

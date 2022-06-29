/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { O_que_eComponent } from './o_que_e.component';

describe('O_que_eComponent', () => {
  let component: O_que_eComponent;
  let fixture: ComponentFixture<O_que_eComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ O_que_eComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(O_que_eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

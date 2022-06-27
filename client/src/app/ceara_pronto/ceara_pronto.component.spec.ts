/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ceara_prontoComponent } from './ceara_pronto.component';

describe('Ceara_prontoComponent', () => {
  let component: Ceara_prontoComponent;
  let fixture: ComponentFixture<Ceara_prontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ceara_prontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ceara_prontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

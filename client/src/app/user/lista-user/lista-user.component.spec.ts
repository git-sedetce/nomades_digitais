import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUserComponent } from './lista-user.component';

describe('ListaUserComponent', () => {
  let component: ListaUserComponent;
  let fixture: ComponentFixture<ListaUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaUserComponent]
    });
    fixture = TestBed.createComponent(ListaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

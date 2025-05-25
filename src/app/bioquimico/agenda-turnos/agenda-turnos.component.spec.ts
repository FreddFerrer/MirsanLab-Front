import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaTurnosComponent } from './agenda-turnos.component';

describe('AgendaTurnosComponent', () => {
  let component: AgendaTurnosComponent;
  let fixture: ComponentFixture<AgendaTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaTurnosComponent]
    });
    fixture = TestBed.createComponent(AgendaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

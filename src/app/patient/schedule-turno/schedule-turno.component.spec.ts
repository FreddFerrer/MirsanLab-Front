import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTurnoComponent } from './schedule-turno.component';

describe('ScheduleTurnoComponent', () => {
  let component: ScheduleTurnoComponent;
  let fixture: ComponentFixture<ScheduleTurnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleTurnoComponent]
    });
    fixture = TestBed.createComponent(ScheduleTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

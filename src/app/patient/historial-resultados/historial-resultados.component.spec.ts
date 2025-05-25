import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialResultadosComponent } from './historial-resultados.component';

describe('HistorialResultadosComponent', () => {
  let component: HistorialResultadosComponent;
  let fixture: ComponentFixture<HistorialResultadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialResultadosComponent]
    });
    fixture = TestBed.createComponent(HistorialResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

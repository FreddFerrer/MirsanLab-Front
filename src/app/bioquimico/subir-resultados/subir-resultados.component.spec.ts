import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirResultadosComponent } from './subir-resultados.component';

describe('SubirResultadosComponent', () => {
  let component: SubirResultadosComponent;
  let fixture: ComponentFixture<SubirResultadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubirResultadosComponent]
    });
    fixture = TestBed.createComponent(SubirResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

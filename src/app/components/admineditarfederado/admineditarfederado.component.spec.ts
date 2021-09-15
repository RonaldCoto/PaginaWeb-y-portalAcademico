import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditarfederadoComponent } from './admineditarfederado.component';

describe('AdmineditarfederadoComponent', () => {
  let component: AdmineditarfederadoComponent;
  let fixture: ComponentFixture<AdmineditarfederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditarfederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditarfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

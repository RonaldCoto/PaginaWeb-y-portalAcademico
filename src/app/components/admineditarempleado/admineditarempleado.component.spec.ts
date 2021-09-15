import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditarempleadoComponent } from './admineditarempleado.component';

describe('AdmineditarempleadoComponent', () => {
  let component: AdmineditarempleadoComponent;
  let fixture: ComponentFixture<AdmineditarempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditarempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditarempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditarcursoComponent } from './admineditarcurso.component';

describe('AdmineditarcursoComponent', () => {
  let component: AdmineditarcursoComponent;
  let fixture: ComponentFixture<AdmineditarcursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditarcursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditarcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

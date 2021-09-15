import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarcursoComponent } from './asignarcurso.component';

describe('AsignarcursoComponent', () => {
  let component: AsignarcursoComponent;
  let fixture: ComponentFixture<AsignarcursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarcursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

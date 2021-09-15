import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarevaluacionComponent } from './editarevaluacion.component';

describe('EditarevaluacionComponent', () => {
  let component: EditarevaluacionComponent;
  let fixture: ComponentFixture<EditarevaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarevaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

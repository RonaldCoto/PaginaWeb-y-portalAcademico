import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarcursoinstructorComponent } from './asignarcursoinstructor.component';

describe('AsignarcursoinstructorComponent', () => {
  let component: AsignarcursoinstructorComponent;
  let fixture: ComponentFixture<AsignarcursoinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarcursoinstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarcursoinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

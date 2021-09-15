import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnotasinstructorComponent } from './listnotasinstructor.component';

describe('ListnotasinstructorComponent', () => {
  let component: ListnotasinstructorComponent;
  let fixture: ComponentFixture<ListnotasinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnotasinstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnotasinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

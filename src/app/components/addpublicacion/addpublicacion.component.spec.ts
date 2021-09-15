import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpublicacionComponent } from './addpublicacion.component';

describe('AddpublicacionComponent', () => {
  let component: AddpublicacionComponent;
  let fixture: ComponentFixture<AddpublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

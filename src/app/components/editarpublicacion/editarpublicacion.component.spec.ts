import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpublicacionComponent } from './editarpublicacion.component';

describe('EditarpublicacionComponent', () => {
  let component: EditarpublicacionComponent;
  let fixture: ComponentFixture<EditarpublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfiladminComponent } from './editarperfiladmin.component';

describe('EditarperfiladminComponent', () => {
  let component: EditarperfiladminComponent;
  let fixture: ComponentFixture<EditarperfiladminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarperfiladminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarperfiladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

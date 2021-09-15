import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfederadoComponent } from './editfederado.component';

describe('EditfederadoComponent', () => {
  let component: EditfederadoComponent;
  let fixture: ComponentFixture<EditfederadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfederadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfederadoComponent } from './editarperfederado.component';

describe('EditarperfederadoComponent', () => {
  let component: EditarperfederadoComponent;
  let fixture: ComponentFixture<EditarperfederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarperfederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarperfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

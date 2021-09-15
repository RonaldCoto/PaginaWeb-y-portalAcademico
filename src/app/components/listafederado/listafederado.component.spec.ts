import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListafederadoComponent } from './listafederado.component';

describe('ListafederadoComponent', () => {
  let component: ListafederadoComponent;
  let fixture: ComponentFixture<ListafederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListafederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListafederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

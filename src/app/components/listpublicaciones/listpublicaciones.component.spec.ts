import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpublicacionesComponent } from './listpublicaciones.component';

describe('ListpublicacionesComponent', () => {
  let component: ListpublicacionesComponent;
  let fixture: ComponentFixture<ListpublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

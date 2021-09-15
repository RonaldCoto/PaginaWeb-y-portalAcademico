import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotasFedecurfinalizadooComponent } from './list-notas-fedecurfinalizadoo.component';

describe('ListNotasFedecurfinalizadooComponent', () => {
  let component: ListNotasFedecurfinalizadooComponent;
  let fixture: ComponentFixture<ListNotasFedecurfinalizadooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNotasFedecurfinalizadooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotasFedecurfinalizadooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

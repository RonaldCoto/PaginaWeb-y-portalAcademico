import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistafederadoComponent } from './adminlistafederado.component';

describe('AdminlistafederadoComponent', () => {
  let component: AdminlistafederadoComponent;
  let fixture: ComponentFixture<AdminlistafederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminlistafederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistafederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

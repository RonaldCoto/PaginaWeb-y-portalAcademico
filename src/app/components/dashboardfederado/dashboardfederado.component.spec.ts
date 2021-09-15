import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardfederadoComponent } from './dashboardfederado.component';

describe('DashboardfederadoComponent', () => {
  let component: DashboardfederadoComponent;
  let fixture: ComponentFixture<DashboardfederadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardfederadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

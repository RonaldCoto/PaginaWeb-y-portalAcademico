import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarevaluacionesComponent } from './administrarevaluaciones.component';

describe('AdministrarevaluacionesComponent', () => {
  let component: AdministrarevaluacionesComponent;
  let fixture: ComponentFixture<AdministrarevaluacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarevaluacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarevaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

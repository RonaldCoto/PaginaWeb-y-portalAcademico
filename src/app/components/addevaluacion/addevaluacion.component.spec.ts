import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddevaluacionComponent } from './addevaluacion.component';

describe('AddevaluacionComponent', () => {
  let component: AddevaluacionComponent;
  let fixture: ComponentFixture<AddevaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddevaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

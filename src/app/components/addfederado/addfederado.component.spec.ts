import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfederadoComponent } from './addfederado.component';

describe('AddfederadoComponent', () => {
  let component: AddfederadoComponent;
  let fixture: ComponentFixture<AddfederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

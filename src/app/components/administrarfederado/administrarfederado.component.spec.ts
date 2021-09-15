import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarfederadoComponent } from './administrarfederado.component';

describe('AdministrarfederadoComponent', () => {
  let component: AdministrarfederadoComponent;
  let fixture: ComponentFixture<AdministrarfederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarfederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

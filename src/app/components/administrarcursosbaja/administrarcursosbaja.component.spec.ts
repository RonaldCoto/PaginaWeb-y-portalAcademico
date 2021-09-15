import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarcursosbajaComponent } from './administrarcursosbaja.component';

describe('AdministrarcursosbajaComponent', () => {
  let component: AdministrarcursosbajaComponent;
  let fixture: ComponentFixture<AdministrarcursosbajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarcursosbajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarcursosbajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

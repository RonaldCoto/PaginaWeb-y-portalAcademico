import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarcursosComponent } from './administrarcursos.component';

describe('AdministrarcursosComponent', () => {
  let component: AdministrarcursosComponent;
  let fixture: ComponentFixture<AdministrarcursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarcursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarcursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

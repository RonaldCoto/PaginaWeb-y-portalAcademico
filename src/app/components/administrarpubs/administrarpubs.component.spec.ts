import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarpubsComponent } from './administrarpubs.component';

describe('AdministrarpubsComponent', () => {
  let component: AdministrarpubsComponent;
  let fixture: ComponentFixture<AdministrarpubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarpubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarpubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

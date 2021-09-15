import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlistanotasComponent } from './adminlistanotas.component';

describe('AdminlistanotasComponent', () => {
  let component: AdminlistanotasComponent;
  let fixture: ComponentFixture<AdminlistanotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminlistanotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlistanotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

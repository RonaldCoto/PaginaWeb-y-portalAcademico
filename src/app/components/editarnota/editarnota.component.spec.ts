import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarnotaComponent } from './editarnota.component';

describe('EditarnotaComponent', () => {
  let component: EditarnotaComponent;
  let fixture: ComponentFixture<EditarnotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarnotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarnotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

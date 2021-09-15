import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasfederadoComponent } from './notasfederado.component';

describe('NotasfederadoComponent', () => {
  let component: NotasfederadoComponent;
  let fixture: ComponentFixture<NotasfederadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasfederadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasfederadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

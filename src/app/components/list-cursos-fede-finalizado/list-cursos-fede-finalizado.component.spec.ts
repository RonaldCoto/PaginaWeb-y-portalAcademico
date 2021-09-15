import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCursosFedeFinalizadoComponent } from './list-cursos-fede-finalizado.component';

describe('ListCursosFedeFinalizadoComponent', () => {
  let component: ListCursosFedeFinalizadoComponent;
  let fixture: ComponentFixture<ListCursosFedeFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCursosFedeFinalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCursosFedeFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

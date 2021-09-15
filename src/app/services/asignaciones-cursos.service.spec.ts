import { TestBed } from '@angular/core/testing';

import { AsignacionesCursosService } from './asignaciones-cursos.service';

describe('AsignacionesCursosService', () => {
  let service: AsignacionesCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionesCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FederadosService } from './federados.service';

describe('FederadosService', () => {
  let service: FederadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FederadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CidadaoService } from './cidadao.service';

describe('CidadaoService', () => {
  let service: CidadaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidadaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ManfestacoesService } from './manfestacoes.service';

describe('ManfestacoesService', () => {
  let service: ManfestacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManfestacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

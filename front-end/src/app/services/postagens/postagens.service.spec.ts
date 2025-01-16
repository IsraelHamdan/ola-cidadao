import { TestBed } from '@angular/core/testing';

import { PostagensService } from './postagens.service';

describe('PostagensService', () => {
  let service: PostagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

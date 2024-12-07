import { TestBed } from '@angular/core/testing';
import { SecretariasService } from './secretarias.service';

describe('SecretariasService', () => {
  let service: SecretariasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretariasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

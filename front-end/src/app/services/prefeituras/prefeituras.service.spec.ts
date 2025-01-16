import { TestBed } from '@angular/core/testing';
import { PrefeiturasService } from './prefeituras.service';

describe('PrefeiturasService', () => {
  let service: PrefeiturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefeiturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PreglediService } from './pregledi.service';

describe('PreglediService', () => {
  let service: PreglediService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreglediService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

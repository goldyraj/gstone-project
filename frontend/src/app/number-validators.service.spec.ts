import { TestBed, inject } from '@angular/core/testing';

import { NumberValidatorsService } from './number-validators.service';

describe('NumberValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumberValidatorsService]
    });
  });

  it('should be created', inject([NumberValidatorsService], (service: NumberValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});

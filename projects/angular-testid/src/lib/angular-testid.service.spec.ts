import {TestBed} from '@angular/core/testing';

import {AngularTestidService} from './angular-testid.service';
import {AngularTestidModule} from "./angular-testid.module";

describe('AngularTestidService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AngularTestidModule]
  }));

  it('should be created', () => {
    const service: AngularTestidService = TestBed.get(AngularTestidService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InviteServiceService } from './invite-service.service';

describe('InviteServiceService', () => {
  let service: InviteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

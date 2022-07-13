import { TestBed } from '@angular/core/testing';

import { TeamListServiceService } from './team-list-service.service';

describe('TeamListServiceService', () => {
  let service: TeamListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

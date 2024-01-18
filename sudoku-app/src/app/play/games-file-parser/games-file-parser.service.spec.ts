import { TestBed } from '@angular/core/testing';

import { GamesFileParserService } from './games-file-parser.service';

describe('GamesFileParserService', () => {
  let service: GamesFileParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesFileParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

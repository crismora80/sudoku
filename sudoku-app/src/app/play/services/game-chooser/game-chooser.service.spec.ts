import { TestBed } from '@angular/core/testing';

import { GameChooserService } from './game-chooser.service';

describe('GameChooserService', () => {
  let service: GameChooserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameChooserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

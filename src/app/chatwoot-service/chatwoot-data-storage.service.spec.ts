import { TestBed } from '@angular/core/testing';

import { ChatwootDataStorageService } from './chatwoot-data-storage.service';

describe('ChatwootDataStorageService', () => {
  let service: ChatwootDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatwootDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

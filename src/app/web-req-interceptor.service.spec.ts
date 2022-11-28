import { TestBed } from '@angular/core/testing';

import { WebRequestInterceptorService } from './web-req-interceptor.service';

describe('WebRequestInterceptorService', () => {
  let service: WebRequestInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRequestInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

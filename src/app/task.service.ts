import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webRequestService: WebRequestService) {}

  createList(title: String) {
    // We want to send a web request to create a list
    return this.webRequestService.post('lists', { title });
  }
}

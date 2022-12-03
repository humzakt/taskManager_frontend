import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { Task } from '../app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  updateList(listId: string, title: string) {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`lists/${listId}`, { title });
  }
  deleteTask(userId: string, taskId: string) {
    return this.webRequestService.delete(`users/${userId}/tasks/${taskId}`);
  }
  deleteList(selectedListId: string) {
    console.log('selected list: ', selectedListId);
    return this.webRequestService.delete(`lists/${selectedListId}`);
  }
  constructor(private webRequestService: WebRequestService) {}

  getLists() {
    return this.webRequestService.get('lists');
  }
  createList(title: String) {
    // We want to send a web request to create a list
    return this.webRequestService.post('lists', { title });
  }

  getTasks(userId: string) {
    return this.webRequestService.get(`users/${userId}/tasks`);
  }

  createTask(title: String, userId: string) {
    // We want to send a web request to create a list
    return this.webRequestService.post(`users/${userId}/tasks`, { title });
  }
  updateTask(userId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`users/${userId}/tasks/${taskId}`, {
      title,
    });
  }
  complete(task: Task) {
    return this.webRequestService.patch(
      `users/${task._userId}/tasks/${task._id}`,
      {
        completed: !task.completed,
      }
    );
  }

  getUsers() {
    return this.webRequestService.get('users/sub-users');
  }
}

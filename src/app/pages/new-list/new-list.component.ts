import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((res: any) => {
      console.log(res);

      // Navigate them to /lists/response._id
    });
  }
}

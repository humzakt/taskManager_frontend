import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  taskId: string = '';
  userId: string = '';

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['taskId'];
      this.userId = params['userId'];
    });
  }

  updateTask(title: string) {
    if (title.length > 0) {
      this.taskService
        .updateTask(this.userId, this.taskId, title)
        .subscribe(() => {
          this.router.navigate(['/lists', this.userId]);
        });
    } else {
      this.router.navigate(['/lists', this.userId]);
    }
  }
}

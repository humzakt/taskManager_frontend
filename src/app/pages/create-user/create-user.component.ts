import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onCreateUserButtonClicked(email: string, password: string) {
    this.authService
      .createUser(email, password)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        // this.router.navigate([`/lists/${res.body._id}`]);
        this.router.navigate([`/lists`]);
      });
  }
}

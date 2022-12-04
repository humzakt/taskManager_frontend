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
    this.removeErrors();
    if (this.verifyEmail(email) && this.verifyPassword(password)) {
      this.authService
        .createUser(email, password)
        .subscribe((res: HttpResponse<any>) => {
          // console.log(res);
          console.log('status', res.status);
          // this.router.navigate([`/lists/${res.body._id}`]);
          if (res.status === 200) {
            // this.router.navigate([`/lists/${data._id}`]);
            this.router.navigate([`/lists/${res.body._id}`]);
          } else {
            this.error = true;
          }
        });
      this.error = true;
    } else {
      this.error = true;
    }
  }

  error: Boolean = false;
  emailValid: Boolean = true;
  passwordValid: Boolean = true;
  verifyEmail(email: string): boolean {
    if (email.length > 0 && email.includes('@') && email.includes('.')) {
      return true;
    } else {
      this.emailValid = false;
      return false;
    }
  }
  removeErrors() {
    this.error = false;
    this.emailValid = true;
    this.passwordValid = true;
  }
  verifyPassword(password: string): boolean {
    if (password.length > 5) {
      return true;
    } else {
      this.passwordValid = false;
      return false;
    }
  }
}

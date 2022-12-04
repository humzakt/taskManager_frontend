import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSignupButtonClicked(email: string, password: string) {
    this.removeErrors();
    if (this.verifyEmail(email) && this.verifyPassword(password)) {
      this.authService
        .signup(email, password)
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.router.navigate(['/lists']);
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

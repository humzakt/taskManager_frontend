import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  LoginButtonClicked(email: string, password: string) {
    this.removeErrors();
    if (this.verifyEmail(email) && this.verifyPassword(password)) {
      this.authService.login(email, password).subscribe((res: any) => {
        console.log('status', res.status);
        if (res.status === 200) {
          this.router.navigate(['/lists']);
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

  ngOnInit(): void {}
}

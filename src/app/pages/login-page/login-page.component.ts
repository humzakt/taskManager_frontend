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
    this.authService.login(email, password).subscribe((res: any) => {
      console.log(res);
      if (res.status === 200) {
        this.router.navigate(['/lists']);
      }
    });
  }

  ngOnInit(): void {}
}

import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  LoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: any) => {
      console.log(res);
    });
    ``;
  }

  ngOnInit(): void {}
}

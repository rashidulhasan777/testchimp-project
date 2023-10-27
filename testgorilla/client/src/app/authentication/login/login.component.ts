import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    'form .ng-touched.ng-invalid { border: 1px solid red; } ',
    'button[disabled] { background-color: grey; }',
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.userService.loginUser(this.loginForm.value).subscribe(
        (_res) => {
          // console.log(res);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);

          err.error.message
            ? (this.errorMessage = err.error.message)
            : err.error.map((e: any) => (this.errorMessage += e.msg + ' '));
          // console.log(this.errorMessage);
        },
      );
    }
  }
}

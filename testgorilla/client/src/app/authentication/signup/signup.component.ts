import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
    'form .ng-touched.ng-invalid { border: 1px solid red; } ',
    'button[disabled] { background-color: grey; }',
  ],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage!: string;
  passwordMatchValidator: ValidatorFn = (g: AbstractControl) => {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  };
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      },
      { validators: this.passwordMatchValidator },
    );
  }

  onSubmit() {
    this.errorMessage = '';
    // console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe(
        (_res) => {
          // console.log(res);
          this.router.navigate(['/']);
          // this.cookieService.put('token', res.token);
        },
        (err) => {
          err.error.message
            ? (this.errorMessage = err.error.message)
            : err.error.map((e: any) => (this.errorMessage += e.msg + ' '));
        },
      );
    }
  }
}

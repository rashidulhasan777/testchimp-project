import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  user!: User;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.userService.getUser().subscribe(
      (res) => {
        // console.log(res);
        this.user = res;
        if (this.router.url === '/dashboard') {
          this.router.navigate(['/dashboard/assessments']);
        }
        // this.router.navigate(['/dashboard/assessments']);
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/login']);
      },
    );
  }
}
